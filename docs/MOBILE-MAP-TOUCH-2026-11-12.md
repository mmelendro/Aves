# Direct touch control on every maintained map

Owner correction: all maps should be controllable with fingers without an activation gate, with double-tap zoom.

Shared planning maps start with gestures enabled. One finger pans, two fingers pinch, and two close taps within350ms zoom the map beneath the tap. A35% pan margin permits moving a fitted planning map; the unchanged default bounds still constrain photograph zoom. Drag/pinch suppress accidental place selection; a single tap still selects a region or habitat. Keyboard and visible controls remain available.

South Island’s SVG habitat adapter follows the same defaults and double-tap recogniser. It no longer suppresses every habitat tap while Move is enabled. Reset retains enabled gestures. The optional hand control pauses gestures rather than being a prerequisite.

The single geographic satellite engine now enables dragging, touch zoom and double-click/tap zoom for coarse and fine pointers alike. Former desktop-only activation caused the phone gate. No location permission, SDK, new provider or second map is introduced. Page scrolling/zoom remains native outside each map canvas.

Verification includes pointer-type-touch component tests for drag at fit, pinch and double tap, double-tap time/distance thresholds, continued single-tap habitat selection, existing geometry/photograph limits, strict types and production build. Physical iPhone/Safari remains separately pending; synthetic pointer tests and narrow desktop views do not claim physical-device acceptance.
