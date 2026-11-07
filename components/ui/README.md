# Reading the shared interface controls

These are small reusable building blocks, largely based on shadcn/Radix patterns. A component being available does not mean a live page uses it. Site-specific text and workflows usually belong one folder above, not here.

| Building block | What to look for |
| --- | --- |
| `button.tsx`, `badge.tsx` | Named visual variants and sizes using `cva`; defaults when callers omit options. |
| `card.tsx` | Container, header, title, content and footer wrappers with shared spacing. |
| `input.tsx`, `textarea.tsx` | Ordinary form controls with shared styling; values and validation come from callers. |
| `dialog.tsx`, `sheet.tsx`, `drawer.tsx` (where present) | Overlays/dialog surfaces; preserve close behavior, focus management and accessible titles. |
| `select.tsx`, `checkbox.tsx`, `switch.tsx` | Styled selection controls; the page supplies options and change handlers. |
| `form.tsx` (where present) | Connects field labels/descriptions/errors to React Hook Form state. |
| Other primitives | Their exports wrap the named control; inspect imports and usage before changing them. |

Repeated code patterns:

```tsx
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  // The generic types describe the DOM element and allowed HTML properties.
  // forwardRef lets a parent obtain the underlying element (for example, to focus it).
  ({ className, ...props }, ref) => (
    // className is taken out for merging; ...props keeps the other caller attributes.
    <div ref={ref} className={cn("rounded-lg border", className)} {...props} />
    // cn combines default styling with the caller's overrides.
  ),
)
Card.displayName = "Card" // A readable name in developer tools, not visible page text.
```

`asChild` on a Button uses a Slot to style its child rather than nesting a second button. This lets a link look like a button without invalid interactive nesting. `Primitive.Root`, `Trigger`, `Content` and `Close` belong to the imported interaction library. A `Portal` renders an overlay outside normal parent clipping. Attributes such as `data-state=open` let CSS follow the library's interaction state.

The main bird carousel lives in `components/homepage-bird-carousel.tsx`, **not** `components/ui/carousel.tsx`. Read [the beginner's guide](../../docs/BEGINNERS-GUIDE.md) and [frontend tour](../../docs/frontend-code-tour.md) before changing shared controls.
