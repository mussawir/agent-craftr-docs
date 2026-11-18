Docs.page({
  id: "issues", group: "Understand it", icon: "🐞", title: "Issues and resolutions",
  summary: "Every problem found so far across the project, what it affected, how it was fixed, and what is still open.",
  body: `
<p>One log for the whole AgentCraftr project. Updated 18 November 2026. Every row traces to a report, a ledger or a commit.</p>
<h2>Backend</h2>
<table>
<tr><th>ID</th><th>Date</th><th>Issue</th><th>Impact</th><th>Resolution</th><th>Status</th><th>Reference</th></tr>
<tr><td>ISS-001</td><td>2026-11-16</td><td>A shop could be activated on a SaudaSulf package without paying; the wrong package could be activated</td><td>Free or wrong package</td><td>Activation now follows the package actually paid for; re-pick after a reversal</td><td>Fixed</td><td>00d7109, f213bfd</td></tr>
<tr><td>ISS-002</td><td>2026-11-16</td><td>A shop's rejection of an app customer did not follow the phone number across devices</td><td>Blocked person could return on another phone</td><td>Rejection now follows the number</td><td>Fixed</td><td>80790ca</td></tr>
<tr><td>ISS-003</td><td>2026-11-17</td><td>Chat blocks did not reach the person; records were made before confirmation; no sign-up limit</td><td>Wrong customers seen, sign-up abuse</td><td>Blocks shown, records only after confirmation, sign-up limit added</td><td>Fixed</td><td>71680ab</td></tr>
<tr><td>ISS-004</td><td>2026-11-17</td><td>Order retries and multi-line orders could clash (duplicate retry got 409, deadlock risk, reference not scoped to customer)</td><td>Failed or duplicate orders</td><td>Safe retries, stable lock order, references scoped to the customer</td><td>Fixed</td><td>fd30ee3</td></tr>
<tr><td>ISS-005</td><td>2026-11-17</td><td>An order was counted and announced even when it was not created</td><td>Wrong counts and alerts</td><td>Count and announce only when created</td><td>Fixed</td><td>b3db084</td></tr>
<tr><td>ISS-006</td><td>2026-11-17</td><td>Cancel and status change could race; confirmed links could be matched to another contact's order</td><td>Invalid order state, double stock return</td><td>Status changes re-check what they read; links stay on their contact</td><td>Fixed</td><td>1e4895e</td></tr>
<tr><td>ISS-007</td><td>2026-11-17</td><td>Stock could be set below zero; stock returns lost updates; chat confirm sold the last item twice (chat vs app)</td><td>Wrong stock, oversold items</td><td>No negative stock; atomic returns; guarded chat stock</td><td>Fixed</td><td>64c0231, 955d128</td></tr>
<tr><td>ISS-008</td><td>2026-11-17</td><td>SaudaSulf usage periods and warnings: time zone errors, warning sent before the count was saved, reversing a renewal while used up lost the used-up period</td><td>Wrong message allowance, false warnings</td><td>TIMESTAMPTZ, UTC-safe, warnings after commit with rollback, used-up period restored</td><td>Fixed</td><td>3a95948, a23a5bc, a3dc29a</td></tr>
<tr><td>ISS-009</td><td>2026-11-17</td><td>Chat replies could be counted twice</td><td>Shop charged extra messages</td><td>after_turn is the only place replies are counted</td><td>Fixed</td><td>5e08e9c</td></tr>
<tr><td>ISS-010</td><td>2026-11-18</td><td>Chat shared the 30/hour shop-lookup limit; push job not tied to a customer (shared-phone leak); no alert when the AI handed over at the limit; failed push left the database stuck; sign-out did not unregister the phone</td><td>Chat blocked, a push could reach the wrong customer</td><td>Own chat rate limit, push tied to customer, used-up alert, rollback on push failure, sign-out unregisters</td><td>Fixed</td><td>8fd762c, a1f86b4</td></tr>
<tr><td>ISS-011</td><td>2026-11-17</td><td>Rejected and temporary push errors were treated the same</td><td>Wasted retries</td><td>fcm_send tells rejected from retryable</td><td>Fixed</td><td>5af3e9f</td></tr>
<tr><td>ISS-012</td><td>2026-11-17</td><td>Order limits can overshoot under parallel requests</td><td>A burst could place a few orders over hourly caps</td><td>Accepted and documented in code (abuse brakes, not money)</td><td>Later</td><td>saudasulf-ordering ledger</td></tr>
<tr><td>ISS-013</td><td>2026-11-18</td><td>Setup writes (items, prices, booking, product, request, persona, industry, channel) were open to non-admin staff</td><td>Staff could change prices and set-up</td><td>Admin only</td><td>Fixed</td><td>5ed7370, 385c4bb</td></tr>
<tr><td>ISS-014</td><td>2026-11-18</td><td>Some 'partner' texts remained after the rename to Franchise holder</td><td>Wrong words shown</td><td>Remaining texts changed</td><td>Fixed</td><td>f7317a3</td></tr>
<tr><td>ISS-015</td><td>2026-11-18</td><td>Delivery proof could be lost if saving failed after the order moved; a rider could mark Delivered without a photo through the old route</td><td>Delivered with no proof</td><td>Proof saved before the order moves; photo required</td><td>Fixed</td><td>0c5eb79</td></tr>
<tr><td>ISS-016</td><td>2026-11-18</td><td>Admin billing: SaudaSulf-only shops listed as WhatsApp debtors; statement missing total owed; double payout click</td><td>Wrong debtors list, double payout</td><td>No WhatsApp row for SaudaSulf-only shops, total owed on statements, payout lines locked (with_for_update)</td><td>Fixed</td><td>571e759</td></tr>
<tr><td>ISS-017</td><td>2026-11-18</td><td>Partner CRM: duplicate business on convert; Trade Partner prospects leaked after a Franchise holder moved; proof file type not checked</td><td>Duplicates, data leak, unsafe files</td><td>Fixed in review</td><td>Fixed</td><td>e5dd64e</td></tr>
<tr><td>ISS-018</td><td>2026-11-18</td><td>A partner proof's amount could be overwritten when the business reopened Billing</td><td>Wrong amount on proof</td><td>Pending partner rows keep amount, currency, package</td><td>Fixed</td><td>d3811bc</td></tr>
<tr><td>ISS-019</td><td>2026-11-18</td><td>No rate limit on AI social captions</td><td>Cost abuse</td><td>20 per minute per admin</td><td>Fixed</td><td>d3811bc</td></tr>
<tr><td>ISS-020</td><td>2026-11-18</td><td>Statement months used UTC; earnings 00:00-05:00 PKT on the 1st fell in the previous month</td><td>Wrong month totals</td><td>Statements use Pakistan time (UTC+5)</td><td>Fixed</td><td>d3811bc</td></tr>
<tr><td>ISS-021</td><td>2026-11-18</td><td>Two Owners could demote each other at the same instant and leave no Owner</td><td>No admin Owner</td><td>Owner rows locked (with_for_update); the test checks the lock call, not the real race</td><td>Fixed</td><td>d3811bc</td></tr>
<tr><td>ISS-022</td><td>2026-11-18</td><td>Confirming a payment screenshot could mark an on-khata order paid</td><td>Order paid twice</td><td>Refused with 409; proof stays pending</td><td>Fixed</td><td>d3811bc</td></tr>
<tr><td>ISS-023</td><td>2026-11-18</td><td>Backend still returns the shop code while SaudaSulf payment is pending (apps show 'Not live')</td><td>Code visible before payment</td><td>Being fixed by another agent</td><td>In progress</td><td>OVERNIGHT-REPORT follow-ups</td></tr>
<tr><td>ISS-024</td><td>2026-11-17</td><td>Parked minors in chat and push: identity row not repaired after a merge; push text English only; no repeat staff alert once a person owns a chat</td><td>Small gaps</td><td>Rulings recorded; decide later</td><td>Later</td><td>chat-and-push ledger</td></tr>
<tr><td>ISS-025</td><td>2026-11-17</td><td>Staff khata has no idempotency key; a blocked-after-confirm link can still be put on khata from CoAgent</td><td>Rare duplicate or wrong entry</td><td>Parked in ledger</td><td>Later</td><td>order-rule-khata ledger</td></tr>
<tr><td>ISS-026</td><td>2026-11-18</td><td>Renewal while used up: the rule is not signed off</td><td>Unclear billing rule</td><td>Waiting for sign-off</td><td>Open - needs Mussawir</td><td>SAUDASULF-HANDOFF</td></tr>
<tr><td>ISS-027</td><td>2026-11-18</td><td>Staff invite by email cannot be sent (no email service); invites are copy-link</td><td>Staff must paste a link</td><td>Needs an email service</td><td>Open - needs Mussawir</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-028</td><td>2026-11-18</td><td>Social auto-posting not built (drafts only)</td><td>Posts are manual</td><td>Planned later</td><td>Later</td><td>social-report</td></tr>
</table>
<h2>Web</h2>
<table>
<tr><th>ID</th><th>Date</th><th>Issue</th><th>Impact</th><th>Resolution</th><th>Status</th><th>Reference</th></tr>
<tr><td>ISS-029</td><td>2026-11-18</td><td>Admin billing payout dialog showed only one month</td><td>Admin could not see everything a payout settles</td><td>Dialog shows the whole payout</td><td>Fixed</td><td>1e1e9a0</td></tr>
<tr><td>ISS-030</td><td>2026-11-18</td><td>Shop code and QR shown while SaudaSulf payment was pending</td><td>Code shown before the package is live</td><td>Shown only while paid</td><td>Fixed</td><td>cb0b92b</td></tr>
<tr><td>ISS-031</td><td>2026-11-18</td><td>Deals.test raised an unhandled Router error</td><td>Noisy test</td><td>Test renders inside a router</td><td>Fixed</td><td>2b3edb5</td></tr>
<tr><td>ISS-032</td><td>2026-11-18</td><td>SaudaSulf menu item shows for every tenant</td><td>Shops without SaudaSulf see it</td><td>Being fixed by another agent</td><td>In progress</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-033</td><td>2026-11-18</td><td>npm audit reports 15 existing issues</td><td>Possible vulnerable packages</td><td>Being reviewed by another agent</td><td>In progress</td><td>saudasulf-web-fixes-report</td></tr>
<tr><td>ISS-034</td><td>2026-11-18</td><td>Admin menu shows the role from sign-in until the next sign-in</td><td>Menu can be stale (the API enforces the live role)</td><td>Accepted</td><td>Later</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-035</td><td>2026-11-18</td><td>Admin tracked social links can point at any external site</td><td>Misuse by an admin</td><td>Noted</td><td>Later</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-036</td><td>2026-11-18</td><td>New admin screens not tested by clicking in a browser; two full-run tests hit 5 s timeouts under load (pass alone)</td><td>Hidden UI bugs</td><td>Test once on staging</td><td>Open - needs Mussawir</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-037</td><td>2026-11-18</td><td>Backend and web must be deployed together (new code reads users.admin_role); old admin sessions must sign in again</td><td>Admin pages fail if deployed apart</td><td>Deploy both together</td><td>Open - needs Mussawir</td><td>OVERNIGHT-REPORT</td></tr>
</table>
<h2>CoAgent</h2>
<table>
<tr><th>ID</th><th>Date</th><th>Issue</th><th>Impact</th><th>Resolution</th><th>Status</th><th>Reference</th></tr>
<tr><td>ISS-038</td><td>2026-11-17</td><td>Out-for-delivery orders were not counted</td><td>Wrong counts</td><td>Counted</td><td>Fixed</td><td>880d62d</td></tr>
<tr><td>ISS-039</td><td>2026-11-18</td><td>Team invite role message and role line wrong; number screen listed non-WhatsApp channels; chat prefilled the number from non-WhatsApp chats</td><td>Wrong prefill, raw error</td><td>Fixed in task review</td><td>Fixed</td><td>c98f3e5, cde6f94, 54bcb5f</td></tr>
<tr><td>ISS-040</td><td>2026-11-18</td><td>Double tap on Delivered opened the camera twice (two queued actions)</td><td>Duplicate deliveries</td><td>Guard covers the camera</td><td>Fixed</td><td>b0c418b</td></tr>
<tr><td>ISS-041</td><td>2026-11-18</td><td>Offline queue could drop a delivery silently</td><td>Lost delivery updates</td><td>Temporary errors retry; refusals show Retry and Discard</td><td>Fixed</td><td>9331726</td></tr>
<tr><td>ISS-042</td><td>2026-11-18</td><td>App sent the duplicate-protection header under one name only (knowledge uploads retried twice)</td><td>Double uploads</td><td>Sent under both names the server uses</td><td>Fixed</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-043</td><td>2026-11-18</td><td>Urdu and dark mode of the Firoza redesign not checked by eye; Urdu line height may clip; Noto Nastaliq not bundled</td><td>Possible layout problems</td><td>Being checked by another agent</td><td>In progress</td><td>coagent-redesign-report</td></tr>
<tr><td>ISS-044</td><td>2026-11-18</td><td>Native Urdu read of the new CoAgent strings not done</td><td>Wording may be off</td><td>Needs a native reader</td><td>Open - needs Mussawir</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-045</td><td>2026-11-18</td><td>Parked minors: owner cannot see proof thumbnails; small UI edge cases</td><td>Small gaps</td><td>Parked in ledger</td><td>Later</td><td>coagent ledger M-1..M-4</td></tr>
</table>
<h2>SaudaSulf app</h2>
<table>
<tr><th>ID</th><th>Date</th><th>Issue</th><th>Impact</th><th>Resolution</th><th>Status</th><th>Reference</th></tr>
<tr><td>ISS-046</td><td>2026-11-16</td><td>Back from the start screen and a flicker after sign-up</td><td>Awkward sign-in</td><td>Fixed</td><td>Fixed</td><td>b2f1997</td></tr>
<tr><td>ISS-047</td><td>2026-11-17</td><td>Not-this-person shown for all; changed cart reused the old order reference; unavailable items stuck in the cart; misleading order-update texts</td><td>Order errors</td><td>Fixed</td><td>Fixed</td><td>13b25ea, d39a013, 116d21a</td></tr>
<tr><td>ISS-048</td><td>2026-11-17</td><td>Package screen only handled offline instructions, not redirect and instant payments</td><td>Could not pay</td><td>Handled</td><td>Fixed</td><td>8c09072</td></tr>
<tr><td>ISS-049</td><td>2026-11-17</td><td>Khata dialogs closed while saving; no amount check; errors lost</td><td>Duplicate or wrong khata entries</td><td>Dialogs stay open, amount validated, reload after network error</td><td>Fixed</td><td>a3448fe, 8f80d77</td></tr>
<tr><td>ISS-050</td><td>2026-11-17</td><td>Payment received and Put on khata shown for orders already on khata or unconfirmed links</td><td>Order paid twice</td><td>Buttons hidden</td><td>Fixed</td><td>3dc6252</td></tr>
<tr><td>ISS-051</td><td>2026-11-17</td><td>Android auto-backup could restore undecryptable secure storage and lose the shop code</td><td>Sign-in problems after restore</td><td>allowBackup off</td><td>Fixed</td><td>08722fe</td></tr>
<tr><td>ISS-052</td><td>2026-11-17</td><td>Customer stuck on the shop screen without back arrow or language switch</td><td>User trapped</td><td>Back arrow and language switch always shown</td><td>Fixed</td><td>50fea97</td></tr>
<tr><td>ISS-053</td><td>2026-11-17</td><td>My shops retry button wording</td><td>Confusing label</td><td>Says Try again</td><td>Fixed</td><td>4fe905b</td></tr>
<tr><td>ISS-054</td><td>2026-11-18</td><td>Push start could throw; live stream never stopped or backed off; sent chat message shown twice during a send</td><td>Crashes, duplicate bubble</td><td>Fixed in review</td><td>Fixed</td><td>acad011, 4bb6028</td></tr>
<tr><td>ISS-055</td><td>2026-11-18</td><td>Push needs Firebase keys (no-op without them)</td><td>No push notifications</td><td>Add Firebase keys per README</td><td>Open - needs Mussawir</td><td>G:\\saudasulf\\README.md</td></tr>
<tr><td>ISS-056</td><td>2026-11-18</td><td>Play internal testing and install-referrer check not done</td><td>Referrer link unverified</td><td>Run on a real device</td><td>Open - needs Mussawir</td><td>SAUDASULF-HANDOFF</td></tr>
<tr><td>ISS-057</td><td>2026-11-18</td><td>iOS build not done; iOS store fallback missing</td><td>No iPhone app</td><td>Needs an iOS build</td><td>Open - needs Mussawir</td><td>order-rule-khata ledger</td></tr>
<tr><td>ISS-058</td><td>2026-11-17</td><td>Deferred minors: no foreground push, first-load error has no retry, signed-out deep link lands on welcome</td><td>Small gaps</td><td>Parked</td><td>Later</td><td>chat-and-push ledger</td></tr>
</table>
<h2>Database/ops</h2>
<table>
<tr><th>ID</th><th>Date</th><th>Issue</th><th>Impact</th><th>Resolution</th><th>Status</th><th>Reference</th></tr>
<tr><td>ISS-059</td><td>2026-11-17</td><td>Customer sign-up returned 500 in production because SaudaSulf tables were missing</td><td>Customers could not sign up</td><td>SQL applied 2026-11-17 after backup</td><td>Fixed</td><td>scripts/sql</td></tr>
<tr><td>ISS-060</td><td>2026-11-18</td><td>pg_dump 17 against a PostgreSQL 18 server fails</td><td>Backups fail</td><td>Use the PG18 binaries</td><td>Fixed</td><td>session note</td></tr>
<tr><td>ISS-061</td><td>2026-11-18</td><td>Release needs SQL before deploy (admin_team, billing_desk, partner_billing_crm, social, rename_roles, saudasulf_chat); deploy of backend and web together is still pending</td><td>500s if code is deployed before SQL</td><td>SQL applied with backups; deploy waits for Mussawir</td><td>Open - needs Mussawir</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-062</td><td>2026-11-18</td><td>Emulator: adb reverse lost after reinstall</td><td>App cannot reach local backend</td><td>Run adb reverse again</td><td>Fixed</td><td>session note</td></tr>
<tr><td>ISS-063</td><td>2026-11-18</td><td>Debug web build failed to load</td><td>Cannot preview</td><td>Use release build</td><td>Fixed</td><td>session note</td></tr>
<tr><td>ISS-064</td><td>2026-11-18</td><td>flutter build web deletes generated l10n</td><td>Build breaks</td><td>Run flutter gen-l10n</td><td>Fixed</td><td>session note</td></tr>
<tr><td>ISS-065</td><td>2026-11-18</td><td>Test shops still in the database</td><td>Test data among live data</td><td>Delete when Mussawir agrees</td><td>Open - needs Mussawir</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-066</td><td>2026-11-18</td><td>Push to remote, docs site upload and Firebase keys not done</td><td>Nothing is live</td><td>Mussawir to push and upload</td><td>Open - needs Mussawir</td><td>OVERNIGHT-REPORT</td></tr>
</table>
<h2>Process/tooling</h2>
<table>
<tr><th>ID</th><th>Date</th><th>Issue</th><th>Impact</th><th>Resolution</th><th>Status</th><th>Reference</th></tr>
<tr><td>ISS-067</td><td>2026-11-18</td><td>IDE auto-commits and auto-pushes the musavir branch</td><td>Unreviewed work pushed</td><td>Turn the IDE setting off</td><td>Open - needs Mussawir</td><td>session note</td></tr>
<tr><td>ISS-068</td><td>2026-11-18</td><td>Backend test suite is slow (9 to 19 minutes; one test loops 20000 usage writes)</td><td>Long waits</td><td>Noted</td><td>Later</td><td>team-roles-report</td></tr>
<tr><td>ISS-069</td><td>2026-11-19</td><td>Usage limit hit once during the overnight run</td><td>Run paused until 3am</td><td>Resumed after reset</td><td>Fixed</td><td>OVERNIGHT-REPORT</td></tr>
<tr><td>ISS-070</td><td>2026-11-18</td><td>Docs screenshots out of date after the redesign</td><td>Wrong screenshots in guides</td><td>Regenerated</td><td>Fixed</td><td>c9d294f, 084605f</td></tr>
</table>
<h2>How to add an issue</h2>
<p>Add a row to the right area with the next ID (ISS-nnn), the date, the problem in plain words, what it affects, what was done, a status, and the commit or report that shows it. Never delete rows; change the status. Edit ISSUES.md and site/data/pages/issues.js together.</p>`,
});
