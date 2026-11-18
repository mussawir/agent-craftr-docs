# Issues and resolutions

One log for the whole AgentCraftr project (backend, web, CoAgent, SaudaSulf app, database and process). Updated 2026-11-18. Status values: Fixed, In progress, Open - needs Mussawir, Later.

## Backend

| ID | Date | Issue | Impact | Resolution | Status | Commit / reference |
|---|---|---|---|---|---|---|
| ISS-001 | 2026-11-16 | A shop could be activated on a SaudaSulf package without paying; the wrong package could be activated | Free or wrong package | Activation now follows the package actually paid for; re-pick after a reversal | Fixed | 00d7109, f213bfd |
| ISS-002 | 2026-11-16 | A shop's rejection of an app customer did not follow the phone number across devices | Blocked person could return on another phone | Rejection now follows the number | Fixed | 80790ca |
| ISS-003 | 2026-11-17 | Chat blocks did not reach the person; records were made before confirmation; no sign-up limit | Wrong customers seen, sign-up abuse | Blocks shown, records only after confirmation, sign-up limit added | Fixed | 71680ab |
| ISS-004 | 2026-11-17 | Order retries and multi-line orders could clash (duplicate retry got 409, deadlock risk, reference not scoped to customer) | Failed or duplicate orders | Safe retries, stable lock order, references scoped to the customer | Fixed | fd30ee3 |
| ISS-005 | 2026-11-17 | An order was counted and announced even when it was not created | Wrong counts and alerts | Count and announce only when created | Fixed | b3db084 |
| ISS-006 | 2026-11-17 | Cancel and status change could race; confirmed links could be matched to another contact's order | Invalid order state, double stock return | Status changes re-check what they read; links stay on their contact | Fixed | 1e4895e |
| ISS-007 | 2026-11-17 | Stock could be set below zero; stock returns lost updates; chat confirm sold the last item twice (chat vs app) | Wrong stock, oversold items | No negative stock; atomic returns; guarded chat stock | Fixed | 64c0231, 955d128 |
| ISS-008 | 2026-11-17 | SaudaSulf usage periods and warnings: time zone errors, warning sent before the count was saved, reversing a renewal while used up lost the used-up period | Wrong message allowance, false warnings | TIMESTAMPTZ, UTC-safe, warnings after commit with rollback, used-up period restored | Fixed | 3a95948, a23a5bc, a3dc29a |
| ISS-009 | 2026-11-17 | Chat replies could be counted twice | Shop charged extra messages | after_turn is the only place replies are counted | Fixed | 5e08e9c |
| ISS-010 | 2026-11-18 | Chat shared the 30/hour shop-lookup limit; push job not tied to a customer (shared-phone leak); no alert when the AI handed over at the limit; failed push left the database stuck; sign-out did not unregister the phone | Chat blocked, a push could reach the wrong customer | Own chat rate limit, push tied to customer, used-up alert, rollback on push failure, sign-out unregisters | Fixed | 8fd762c, a1f86b4 |
| ISS-011 | 2026-11-17 | Rejected and temporary push errors were treated the same | Wasted retries | fcm_send tells rejected from retryable | Fixed | 5af3e9f |
| ISS-012 | 2026-11-17 | Order limits can overshoot under parallel requests | A burst could place a few orders over hourly caps | Accepted and documented in code (abuse brakes, not money) | Later | saudasulf-ordering ledger |
| ISS-013 | 2026-11-18 | Setup writes (items, prices, booking, product, request, persona, industry, channel) were open to non-admin staff | Staff could change prices and set-up | Admin only | Fixed | 5ed7370, 385c4bb |
| ISS-014 | 2026-11-18 | Some 'partner' texts remained after the rename to Franchise holder | Wrong words shown | Remaining texts changed | Fixed | f7317a3 |
| ISS-015 | 2026-11-18 | Delivery proof could be lost if saving failed after the order moved; a rider could mark Delivered without a photo through the old route | Delivered with no proof | Proof saved before the order moves; photo required | Fixed | 0c5eb79 |
| ISS-016 | 2026-11-18 | Admin billing: SaudaSulf-only shops listed as WhatsApp debtors; statement missing total owed; double payout click | Wrong debtors list, double payout | No WhatsApp row for SaudaSulf-only shops, total owed on statements, payout lines locked (with_for_update) | Fixed | 571e759 |
| ISS-017 | 2026-11-18 | Partner CRM: duplicate business on convert; Trade Partner prospects leaked after a Franchise holder moved; proof file type not checked | Duplicates, data leak, unsafe files | Fixed in review | Fixed | e5dd64e |
| ISS-018 | 2026-11-18 | A partner proof's amount could be overwritten when the business reopened Billing | Wrong amount on proof | Pending partner rows keep amount, currency, package | Fixed | d3811bc |
| ISS-019 | 2026-11-18 | No rate limit on AI social captions | Cost abuse | 20 per minute per admin | Fixed | d3811bc |
| ISS-020 | 2026-11-18 | Statement months used UTC; earnings 00:00-05:00 PKT on the 1st fell in the previous month | Wrong month totals | Statements use Pakistan time (UTC+5) | Fixed | d3811bc |
| ISS-021 | 2026-11-18 | Two Owners could demote each other at the same instant and leave no Owner | No admin Owner | Owner rows locked (with_for_update); the test checks the lock call, not the real race | Fixed | d3811bc |
| ISS-022 | 2026-11-18 | Confirming a payment screenshot could mark an on-khata order paid | Order paid twice | Refused with 409; proof stays pending | Fixed | d3811bc |
| ISS-023 | 2026-11-18 | Backend still returns the shop code while SaudaSulf payment is pending (apps show 'Not live') | Code visible before payment | Being fixed by another agent | In progress | OVERNIGHT-REPORT follow-ups |
| ISS-024 | 2026-11-17 | Parked minors in chat and push: identity row not repaired after a merge; push text English only; no repeat staff alert once a person owns a chat | Small gaps | Rulings recorded; decide later | Later | chat-and-push ledger |
| ISS-025 | 2026-11-17 | Staff khata has no idempotency key; a blocked-after-confirm link can still be put on khata from CoAgent | Rare duplicate or wrong entry | Parked in ledger | Later | order-rule-khata ledger |
| ISS-026 | 2026-11-18 | Renewal while used up: the rule is not signed off | Unclear billing rule | Waiting for sign-off | Open - needs Mussawir | SAUDASULF-HANDOFF |
| ISS-027 | 2026-11-18 | Staff invite by email cannot be sent (no email service); invites are copy-link | Staff must paste a link | Needs an email service | Open - needs Mussawir | OVERNIGHT-REPORT |
| ISS-028 | 2026-11-18 | Social auto-posting not built (drafts only) | Posts are manual | Planned later | Later | social-report |

## Web

| ID | Date | Issue | Impact | Resolution | Status | Commit / reference |
|---|---|---|---|---|---|---|
| ISS-029 | 2026-11-18 | Admin billing payout dialog showed only one month | Admin could not see everything a payout settles | Dialog shows the whole payout | Fixed | 1e1e9a0 |
| ISS-030 | 2026-11-18 | Shop code and QR shown while SaudaSulf payment was pending | Code shown before the package is live | Shown only while paid | Fixed | cb0b92b |
| ISS-031 | 2026-11-18 | Deals.test raised an unhandled Router error | Noisy test | Test renders inside a router | Fixed | 2b3edb5 |
| ISS-032 | 2026-11-18 | SaudaSulf menu item shows for every tenant | Shops without SaudaSulf see it | Being fixed by another agent | In progress | OVERNIGHT-REPORT |
| ISS-033 | 2026-11-18 | npm audit reports 15 existing issues | Possible vulnerable packages | Being reviewed by another agent | In progress | saudasulf-web-fixes-report |
| ISS-034 | 2026-11-18 | Admin menu shows the role from sign-in until the next sign-in | Menu can be stale (the API enforces the live role) | Accepted | Later | OVERNIGHT-REPORT |
| ISS-035 | 2026-11-18 | Admin tracked social links can point at any external site | Misuse by an admin | Noted | Later | OVERNIGHT-REPORT |
| ISS-036 | 2026-11-18 | New admin screens not tested by clicking in a browser; two full-run tests hit 5 s timeouts under load (pass alone) | Hidden UI bugs | Test once on staging | Open - needs Mussawir | OVERNIGHT-REPORT |
| ISS-037 | 2026-11-18 | Backend and web must be deployed together (new code reads users.admin_role); old admin sessions must sign in again | Admin pages fail if deployed apart | Deploy both together | Open - needs Mussawir | OVERNIGHT-REPORT |

## CoAgent

| ID | Date | Issue | Impact | Resolution | Status | Commit / reference |
|---|---|---|---|---|---|---|
| ISS-038 | 2026-11-17 | Out-for-delivery orders were not counted | Wrong counts | Counted | Fixed | 880d62d |
| ISS-039 | 2026-11-18 | Team invite role message and role line wrong; number screen listed non-WhatsApp channels; chat prefilled the number from non-WhatsApp chats | Wrong prefill, raw error | Fixed in task review | Fixed | c98f3e5, cde6f94, 54bcb5f |
| ISS-040 | 2026-11-18 | Double tap on Delivered opened the camera twice (two queued actions) | Duplicate deliveries | Guard covers the camera | Fixed | b0c418b |
| ISS-041 | 2026-11-18 | Offline queue could drop a delivery silently | Lost delivery updates | Temporary errors retry; refusals show Retry and Discard | Fixed | 9331726 |
| ISS-042 | 2026-11-18 | App sent the duplicate-protection header under one name only (knowledge uploads retried twice) | Double uploads | Sent under both names the server uses | Fixed | OVERNIGHT-REPORT |
| ISS-043 | 2026-11-18 | Urdu and dark mode of the Firoza redesign not checked by eye; Urdu line height may clip; Noto Nastaliq not bundled | Possible layout problems | Being checked by another agent | In progress | coagent-redesign-report |
| ISS-044 | 2026-11-18 | Native Urdu read of the new CoAgent strings not done | Wording may be off | Needs a native reader | Open - needs Mussawir | OVERNIGHT-REPORT |
| ISS-045 | 2026-11-18 | Parked minors: owner cannot see proof thumbnails; small UI edge cases | Small gaps | Parked in ledger | Later | coagent ledger M-1..M-4 |

## SaudaSulf app

| ID | Date | Issue | Impact | Resolution | Status | Commit / reference |
|---|---|---|---|---|---|---|
| ISS-046 | 2026-11-16 | Back from the start screen and a flicker after sign-up | Awkward sign-in | Fixed | Fixed | b2f1997 |
| ISS-047 | 2026-11-17 | Not-this-person shown for all; changed cart reused the old order reference; unavailable items stuck in the cart; misleading order-update texts | Order errors | Fixed | Fixed | 13b25ea, d39a013, 116d21a |
| ISS-048 | 2026-11-17 | Package screen only handled offline instructions, not redirect and instant payments | Could not pay | Handled | Fixed | 8c09072 |
| ISS-049 | 2026-11-17 | Khata dialogs closed while saving; no amount check; errors lost | Duplicate or wrong khata entries | Dialogs stay open, amount validated, reload after network error | Fixed | a3448fe, 8f80d77 |
| ISS-050 | 2026-11-17 | Payment received and Put on khata shown for orders already on khata or unconfirmed links | Order paid twice | Buttons hidden | Fixed | 3dc6252 |
| ISS-051 | 2026-11-17 | Android auto-backup could restore undecryptable secure storage and lose the shop code | Sign-in problems after restore | allowBackup off | Fixed | 08722fe |
| ISS-052 | 2026-11-17 | Customer stuck on the shop screen without back arrow or language switch | User trapped | Back arrow and language switch always shown | Fixed | 50fea97 |
| ISS-053 | 2026-11-17 | My shops retry button wording | Confusing label | Says Try again | Fixed | 4fe905b |
| ISS-054 | 2026-11-18 | Push start could throw; live stream never stopped or backed off; sent chat message shown twice during a send | Crashes, duplicate bubble | Fixed in review | Fixed | acad011, 4bb6028 |
| ISS-055 | 2026-11-18 | Push needs Firebase keys (no-op without them) | No push notifications | Add Firebase keys per README | Open - needs Mussawir | G:\\saudasulf\\README.md |
| ISS-056 | 2026-11-18 | Play internal testing and install-referrer check not done | Referrer link unverified | Run on a real device | Open - needs Mussawir | SAUDASULF-HANDOFF |
| ISS-057 | 2026-11-18 | iOS build not done; iOS store fallback missing | No iPhone app | Needs an iOS build | Open - needs Mussawir | order-rule-khata ledger |
| ISS-058 | 2026-11-17 | Deferred minors: no foreground push, first-load error has no retry, signed-out deep link lands on welcome | Small gaps | Parked | Later | chat-and-push ledger |

## Database/ops

| ID | Date | Issue | Impact | Resolution | Status | Commit / reference |
|---|---|---|---|---|---|---|
| ISS-059 | 2026-11-17 | Customer sign-up returned 500 in production because SaudaSulf tables were missing | Customers could not sign up | SQL applied 2026-11-17 after backup | Fixed | scripts/sql |
| ISS-060 | 2026-11-18 | pg_dump 17 against a PostgreSQL 18 server fails | Backups fail | Use the PG18 binaries | Fixed | session note |
| ISS-061 | 2026-11-18 | Release needs SQL before deploy (admin_team, billing_desk, partner_billing_crm, social, rename_roles, saudasulf_chat); deploy of backend and web together is still pending | 500s if code is deployed before SQL | SQL applied with backups; deploy waits for Mussawir | Open - needs Mussawir | OVERNIGHT-REPORT |
| ISS-062 | 2026-11-18 | Emulator: adb reverse lost after reinstall | App cannot reach local backend | Run adb reverse again | Fixed | session note |
| ISS-063 | 2026-11-18 | Debug web build failed to load | Cannot preview | Use release build | Fixed | session note |
| ISS-064 | 2026-11-18 | flutter build web deletes generated l10n | Build breaks | Run flutter gen-l10n | Fixed | session note |
| ISS-065 | 2026-11-18 | Test shops still in the database | Test data among live data | Delete when Mussawir agrees | Open - needs Mussawir | OVERNIGHT-REPORT |
| ISS-066 | 2026-11-18 | Push to remote, docs site upload and Firebase keys not done | Nothing is live | Mussawir to push and upload | Open - needs Mussawir | OVERNIGHT-REPORT |

## Process/tooling

| ID | Date | Issue | Impact | Resolution | Status | Commit / reference |
|---|---|---|---|---|---|---|
| ISS-067 | 2026-11-18 | IDE auto-commits and auto-pushes the musavir branch | Unreviewed work pushed | Turn the IDE setting off | Open - needs Mussawir | session note |
| ISS-068 | 2026-11-18 | Backend test suite is slow (9 to 19 minutes; one test loops 20000 usage writes) | Long waits | Noted | Later | team-roles-report |
| ISS-069 | 2026-11-19 | Usage limit hit once during the overnight run | Run paused until 3am | Resumed after reset | Fixed | OVERNIGHT-REPORT |
| ISS-070 | 2026-11-18 | Docs screenshots out of date after the redesign | Wrong screenshots in guides | Regenerated | Fixed | c9d294f, 084605f |

## How to add an issue

Add a row to the right area with the next ID (ISS-nnn), the date, the problem in plain words, what it affects, what was done, a status, and the commit or report that shows it. Never delete rows; change the status. Edit ISSUES.md and site/data/pages/issues.js together.
