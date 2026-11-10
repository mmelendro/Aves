/** Session-only listening preference. Reuses the carousel's single audio element. */
export type FollowCallStatus = "off" | "loading" | "playing" | "ready" | "missing" | "blocked"
type CallAudio = Pick<HTMLAudioElement, "pause" | "volume" | "muted">
export class FollowBirdCalls {
  enabled = false
  private audio: CallAudio | null = null
  private revision = 0
  private level: { volume: number; muted: boolean } | null = null
  constructor(private play: (audio: CallAudio) => Promise<void>, private changed: (status: FollowCallStatus) => void) {}
  start(audio: CallAudio | null) { this.enabled = true; this.select(audio) }
  select(audio: CallAudio | null) {
    const previous = this.audio
    ++this.revision
    if (previous) { this.level = { volume: previous.volume, muted: previous.muted }; previous.pause() }
    this.audio = audio
    if (audio && audio !== previous && this.level) { audio.volume = this.level.volume; audio.muted = this.level.muted }
    if (!this.enabled) return
    if (!audio) { this.changed("missing"); return }
    const revision = this.revision
    this.changed("loading")
    // The injected function is the shared foreground-media coordinator.
    let result: Promise<void>
    try { result = this.play(audio) } catch { this.failed(revision); return }
    result.then(() => {
      if (revision !== this.revision || !this.enabled) { if (audio !== this.audio || !this.enabled) audio.pause(); return }
      this.changed("playing")
    }, () => { this.failed(revision) })
  }
  private failed(revision: number) {
    if (revision !== this.revision || !this.enabled) return
    this.enabled = false
    this.audio?.pause()
    this.changed("blocked")
  }
  ended() { if (this.enabled) this.changed("ready") }
  stop() { ++this.revision; this.enabled = false; this.audio?.pause(); this.changed("off") }
  /** Cleanup has no React notification after its viewer has unmounted. */
  dispose() { ++this.revision; this.enabled = false; this.audio?.pause(); this.audio = null }
}
