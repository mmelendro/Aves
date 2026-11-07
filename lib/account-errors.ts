/**
 * Small error type for messages the account API is allowed to show a visitor.
 * It carries an HTTP status and deliberately chosen text, not a raw database error.
 * Throwing this error does not itself check identity or permission.
 */

/**
 * Carry a deliberate HTTP status/message for accountHandler to expose; keep sensitive provider details out.
 */
export class AccountError extends Error {
  constructor(public readonly status: number, message: string) { super(message); this.name = "AccountError" }
}
