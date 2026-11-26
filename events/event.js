/* Event-page presentation only. Live registrations are deliberately disabled. */
(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const query = new URLSearchParams(location.search);
  const demo = query.get("demo") === "1";
  // Synthetic UI fixture only; no private sheet row is committed.
  const example = {
    name: "Eagle Ridge Qualifier", course: "Eagle Ridge Golf & Country Club", region: "Cavite",
    date: "Feb 6, 2027", teeTime: "7:00 AM", fee: "₱3,000.00", capacity: 40,
    deadline: "Feb 4, 2027 5:00 PM", status: "Open",
    inclusions: "Green fee, shared golf cart and tournament fee",
    description: "Compete in a WAGC Philippines qualifying tournament and take your first step toward the 2027 National Finals. Flights are assigned by the tournament committee.",
    image: "/images/sample-eagle-ridge-flyer.png"
  };
  const statuses = {
    "Coming Soon": "Registration opens soon.",
    "Open": "Registration is not available online yet.",
    "Fully Booked": "This tournament is fully booked.",
    "Closed": "Registration is closed.",
    "Completed": "This tournament has concluded.",
    "Cancelled": "This tournament has been cancelled."
  };
  const set = (id, value) => { el(id).textContent = value == null ? "" : String(value); };
  function safeImage(value) {
    if (!value) return "";
    try {
      const u = new URL(value, location.origin);
      return u.protocol === "https:" && !u.username && !u.password ? u.href : "";
    } catch { return ""; }
  }
  function render(data) {
    if (!data || typeof data.name !== "string" || !data.name.trim() ||
        !Object.prototype.hasOwnProperty.call(statuses, data.status)) throw new Error("Invalid event");
    set("event-title", data.name);
    set("event-date", data.date || "To be announced");
    set("event-venue", [data.course, data.region].filter(Boolean).join(", ") || "To be announced");
    set("event-time", data.teeTime || "");
    el("tee-row").hidden = !data.teeTime;
    set("event-price", data.fee || "To be announced");
    el("per-player").hidden = !data.fee;
    set("event-description", data.description || "Join the WAGC Philippines Qualifying Series.");
    const inclusions = String(data.inclusions || "").split(/[,;\n]+/).map(v => v.trim()).filter(Boolean);
    // A sheet may use "and" in its inclusions. Preserve the meaning rather than guess at benefits.
    el("inclusions").replaceChildren(...inclusions.map(v => {
      const li = document.createElement("li"); li.textContent = v; return li;
    }));
    el("inclusions-block").hidden = !inclusions.length;
    set("event-deadline", data.deadline || "");
    el("deadline-block").hidden = !data.deadline;
    const photo = safeImage(data.image);
    if (photo) {
      el("event-image").addEventListener("error", () => { el("flyer-block").hidden = true; }, {once:true});
      el("event-image").alt = data.name + " tournament flyer";
      el("flyer-link").href = photo;
      el("event-image").src = photo;
      el("flyer-block").hidden = false;
    }
    const capacity = Number(data.capacity);
    const limit = Number.isSafeInteger(capacity) && capacity > 0 ? "Limited to " + capacity + " players. " : "";
    set("booking-note", limit + (demo ? "Preview only." : statuses[data.status]));
    set("form-status", demo
      ? "Test the form with fictional information. No submission or payment is processed."
      : statuses[data.status]);
    el("hero-cta").textContent = demo ? "Register now" : "Registration information";
    document.title = (demo ? "Preview — " : "") + data.name + " | WAGC Philippines";
    el("loading").hidden = true; el("event-page").hidden = false;
  }
  // No network request or storage of form input in this implementation.
  el("registration-form").addEventListener("submit", e => {
    e.preventDefault();
    if (!demo || !el("registration-form").reportValidity()) return;
    el("registration-form").reset();
    el("form-panel").hidden = true;
    el("confirmation").hidden = false;
    el("confirmation").focus();
  });
  el("reset-form").addEventListener("click", () => {
    el("confirmation").hidden = true; el("form-panel").hidden = false;
    el("first").focus();
  });
  async function load() {
    if (demo) {
      el("demo-banner").hidden = false;
      render(example);
      el("registration-fields").disabled = false;
      el("submit").disabled = false;
      return;
    }
    const id = query.get("id") || "";
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{0,79}$/.test(id)) {
      set("loading-message", "Select a tournament from the schedule."); return;
    }
    try {
      const response = await fetch("/api/events/" + encodeURIComponent(id), {
        headers: {"Accept":"application/json"}, credentials:"same-origin", cache:"no-store"
      });
      if (!response.ok) {
        set("loading-message", response.status === 404
          ? "This tournament is not available." : "Tournament details are temporarily unavailable.");
        return;
      }
      render(await response.json());
    } catch {
      set("loading-message", "Tournament details are temporarily unavailable.");
    }
  }
  load();
})();
