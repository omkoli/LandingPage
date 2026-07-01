/**
 * Waitlist submission helper.
 *
 * Point this at any no-backend form endpoint that accepts a JSON POST and
 * returns JSON — e.g. Formspree, Formcarry, Basin, Getform, Formspark or
 * Web3Forms. Set the endpoint in `.env.local`:
 *
 *   NEXT_PUBLIC_WAITLIST_ENDPOINT=https://formspree.io/f/xxxxxxx
 *
 * With Web3Forms, also set your access key and it will be attached
 * automatically:
 *
 *   NEXT_PUBLIC_WEB3FORMS_KEY=your-access-key
 *
 * Until an endpoint is configured the form runs in "demo mode": it simulates a
 * successful submission (so the UI works locally) but does not persist anything.
 */

const ENDPOINT = process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT;
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export type WaitlistResult = {
  ok: boolean;
  demo: boolean;
  error?: string;
};

export async function submitWaitlist(
  payload: Record<string, string>
): Promise<WaitlistResult> {
  const endpoint = ENDPOINT ?? (WEB3FORMS_KEY ? "https://api.web3forms.com/submit" : undefined);

  // No provider configured yet → demo mode so the page still works out of the box.
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 650));
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(
        "[waitlist] No form endpoint set — running in demo mode. " +
          "Set NEXT_PUBLIC_WAITLIST_ENDPOINT (or NEXT_PUBLIC_WEB3FORMS_KEY) to capture real submissions."
      );
    }
    return { ok: true, demo: true };
  }

  const body: Record<string, string> = { ...payload };
  if (WEB3FORMS_KEY) body.access_key = WEB3FORMS_KEY;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return {
        ok: false,
        demo: false,
        error: "Something went wrong. Please try again in a moment.",
      };
    }
    return { ok: true, demo: false };
  } catch {
    return {
      ok: false,
      demo: false,
      error: "Network error — please check your connection and try again.",
    };
  }
}
