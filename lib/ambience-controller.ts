/** At most two voices during one crossfade. The context is created only by an
 * explicit visitor action; gain nodes support volume on mobile Safari too. */
type Voice = { id: string; element: HTMLAudioElement; source: MediaElementAudioSourceNode; gain: GainNode }
export type AmbienceTrack = { id: string; src: string }

export class AmbienceController {
  private current: Voice | null = null
  private incoming: Voice | null = null
  private retiring: Voice | null = null
  private generation = 0
  private timer: ReturnType<typeof setTimeout> | undefined
  private closed = false
  private master: GainNode

  constructor(private context: AudioContext, private makeAudio: () => HTMLAudioElement, private report: (status: "loading" | "playing" | "unavailable" | "error") => void) {
    this.master = context.createGain()
    this.master.gain.value = 0
    this.master.connect(context.destination)
  }

  level(volume: number, muted: boolean, foreground: boolean) {
    const gain = this.master.gain
    const now = this.context.currentTime
    gain.cancelScheduledValues(now)
    gain.setTargetAtTime(muted ? 0 : Math.min(1, Math.max(0, volume)) * (foreground ? .08 : 1), now, foreground ? .035 : .18)
  }

  private release(voice: Voice | null) {
    if (!voice) return
    voice.element.onerror = null
    voice.element.pause()
    voice.element.removeAttribute("src")
    voice.element.load()
    voice.source.disconnect()
    voice.gain.disconnect()
    voice.element.remove()
  }

  stop() {
    this.generation++
    clearTimeout(this.timer)
    this.release(this.incoming); this.incoming = null
    this.release(this.retiring); this.retiring = null
    this.release(this.current); this.current = null
  }

  select(track: AmbienceTrack | null) {
    if (this.closed) return
    // A third request ends the previous fade, rather than stacking voices.
    clearTimeout(this.timer)
    this.release(this.retiring); this.retiring = null
    this.release(this.incoming); this.incoming = null
    const request = ++this.generation
    if (!track) { this.stop(); this.report("unavailable"); return }
    if (this.current?.id === track.id) { this.report("playing"); return }
    this.report("loading")
    const element = this.makeAudio()
    element.preload = "none"
    element.loop = true
    element.src = track.src
    const gain = this.context.createGain()
    gain.gain.value = 0
    gain.connect(this.master)
    const source = this.context.createMediaElementSource(element)
    source.connect(gain)
    const voice = { id: track.id, element, source, gain }
    this.incoming = voice
    const fail = () => {
      if (this.closed || (this.incoming !== voice && this.current !== voice)) return
      this.stop(); this.report("error")
    }
    element.onerror = fail
    // Both calls happen in the user gesture for the first recording. Later
    // habitat transitions reuse this explicitly unlocked context.
    const resumed = this.context.resume()
    const played = element.play()
    Promise.all([resumed, played]).then(() => {
      if (this.closed || request !== this.generation) return
      this.incoming = null
      const previous = this.current
      this.current = voice
      const now = this.context.currentTime
      gain.gain.setValueAtTime(0, now)
      gain.gain.linearRampToValueAtTime(1, now + .65)
      if (previous) {
        previous.gain.gain.cancelScheduledValues(now)
        previous.gain.gain.setValueAtTime(previous.gain.gain.value, now)
        previous.gain.gain.linearRampToValueAtTime(0, now + .65)
        this.retiring = previous
        this.timer = setTimeout(() => { this.release(this.retiring); this.retiring = null }, 700)
      }
      this.report("playing")
    }).catch(fail)
  }

  dispose() {
    this.closed = true
    this.stop()
    this.master.disconnect()
    void this.context.close().catch(() => {})
  }
}
