# Plan - Fix "Unsupported provider" error for Google Login

The user is experiencing an `Unsupported provider: provider is not enabled` error when attempting to sign in with Google. This indicates that the Google OAuth provider is not enabled in the backend configuration.

## Proposed Changes

### Backend Configuration
- Enable the Google social authentication provider using the `supabase--configure_social_auth` tool.
- This will enable "Managed Social Login" for Google within the Lovable Cloud environment.

## Verification Plan

### Automated Verification
- I will check the authentication logs using `supabase--analytics_query` to see if the "Unsupported provider" error persists after configuration.
- I will run a Playwright script to simulate clicking the "Google" button and verify it redirects to the Google consent screen (instead of returning an error immediatey).

### Manual Verification
- The user can test the login button in the preview.
