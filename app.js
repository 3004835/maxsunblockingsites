/*
  DEMO CLIENT-SIDE EMAIL GATE
  This checks login.json in the browser. It is NOT secure access control:
  anyone can inspect/download the JSON and the page source. For real student
  data, replace this with a server-side endpoint and never publish email lists.
*/
const resources = [
  { title: "Web resources", items: [
    ["chroblox.space","https://chroblox.space"],
    ["space.wib.ro","https://space.wib.ro"],
    ["chroblox.online","https://chroblox.online"],
    ["cinera.wib.ro","https://cinera.wib.ro"],
    ["chroblox.site","https://chroblox.site"],
    ["s2v6.z20.web.core.windows.net","https://s2v6.z20.web.core.windows.net"],
    ["aurora.wib.ro","https://aurora.wib.ro"],
    ["v8vf.z1.web.core.windows.net","https://v8vf.z1.web.core.windows.net"],
    ["mole.losmolles.com.ar","https://mole.losmolles.com.ar"],
    ["stro.wib.ro","https://stro.wib.ro"],
    ["opiumbest.github.io","https://opiumbest.github.io"],
    ["agek.z5.web.core.windows.net","https://agek.z5.web.core.windows.net"],
    ["triplethd.solidaritysafaris.com","https://triplethd.solidaritysafaris.com"],
    ["studyhub.solidaritysafaris.com","https://studyhub.solidaritysafaris.com"],
    ["utopia.solidaritysafaris.com","https://utopia.solidaritysafaris.com"],
    ["voya-school.inmobiliariamardelplata.com","https://voya-school.inmobiliariamardelplata.com"],
    ["edu.max-yt2025.space","",true]
  ]},
  { title: "Abstract", items: [
    ["mathewteachesalgebra.site","https://mathewteachesalgebra.site"],
    ["estheticsbyabby.com","https://estheticsbyabby.com"],
    ["artemata.it","https://artemata.it"],
    ["clever.ixl.learning.gov.nextcomm.com.ar","https://clever.ixl.learning.gov.nextcomm.com.ar"],
    ["hoppingrabbits.bjk.life","https://hoppingrabbits.bjk.life"]
  ]},
  { title: "Additional pages", items: [
    ["teacher.govt.hu","http://teacher.govt.hu"],
    ["bulls.best.govt.hu","http://bulls.best.govt.hu"],
    ["jury.tjarba.com","http://jury.tjarba.com"]
  ]}
];

const loginView = document.getElementById("login-view");
const directoryView = document.getElementById("directory-view");
const form = document.getElementById("login-form");
const emailInput = document.getElementById("student-email");
const errorBox = document.getElementById("login-error");
const loginButton = document.getElementById("login-button");

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}
function renderResources() {
  const host = document.getElementById("resource-groups");
  host.replaceChildren();
  let count = 0;
  resources.forEach(group => {
    const section = document.createElement("section");
    section.className = "resource-group";
    const heading = document.createElement("h3");
    heading.textContent = group.title;
    section.appendChild(heading);
    const grid = document.createElement("div");
    grid.className = "resource-grid";
    group.items.forEach(([title, url, comingSoon]) => {
      count++;
      const card = document.createElement(url ? "a" : "div");
      card.className = "resource-card" + (comingSoon ? " coming-soon" : "");
      if (url) {
        card.href = url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
      } else {
        card.setAttribute("aria-disabled", "true");
      }
      const icon = document.createElement("span");
      icon.className = "resource-icon";
      icon.textContent = comingSoon ? "◷" : "↗";
      const info = document.createElement("span");
      info.className = "resource-info";
      const name = document.createElement("strong");
      name.textContent = title;
      const domain = document.createElement("small");
      domain.textContent = comingSoon ? "Coming soon" : new URL(url).hostname;
      info.append(name, domain);
      card.append(icon, info);
      if (url) {
        const arrow = document.createElement("span");
        arrow.className = "external-arrow";
        arrow.textContent = "↗";
        card.appendChild(arrow);
      }
      grid.appendChild(card);
    });
    section.appendChild(grid);
    host.appendChild(section);
  });
  document.getElementById("resource-count").textContent = `${count} pages`;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox.hidden = true;
  const email = emailInput.value.trim().toLowerCase();
  if (!email) return showError("Enter your student email to continue.");
  loginButton.disabled = true;
  loginButton.textContent = "Checking…";
  try {
    const loginUrl = new URL("./login.json", window.location.href);
    const response = await fetch(loginUrl.href, { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load the access list.");
    const data = await response.json();
    const allowed = Array.isArray(data) ? data : data.allowedEmails;
    if (!Array.isArray(allowed)) throw new Error("The access list format is invalid.");
    const match = allowed.some(entry => {
      const value = typeof entry === "string" ? entry : entry && entry.email;
      return typeof value === "string" && value.trim().toLowerCase() === email;
    });
    if (!match) {
      showError("That email isn't on the access list. Check the address or contact the site administrator.");
      return;
    }
    document.getElementById("signed-in-as").textContent = email;
    renderResources();
    loginView.hidden = true;
    directoryView.hidden = false;
  } catch (err) {
    showError((err instanceof TypeError ? "Could not load login.json. Check that it is published beside index.html and open the login.json URL directly. " : "") + (err.message || "Something went wrong. Please try again."));
  } finally {
    loginButton.disabled = false;
    loginButton.innerHTML = 'Continue <span aria-hidden="true">→</span>';
  }
});

document.getElementById("sign-out").addEventListener("click", () => {
  emailInput.value = "";
  directoryView.hidden = true;
  loginView.hidden = false;
});
