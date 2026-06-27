import type { Resume } from "@/lib/schema/resume";
import type { TemplateId } from "@/templates/types";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function text(value: string | undefined) {
  return escapeHtml(value ?? "");
}

function joinDefined(values: Array<string | undefined>, separator: string) {
  return values.filter(Boolean).map((value) => text(value)).join(separator);
}

function section(title: string, body: string) {
  if (!body.trim()) {
    return "";
  }

  return `<section class="section"><h2>${escapeHtml(title)}</h2>${body}</section>`;
}

function list(items: string[]) {
  if (items.length === 0) {
    return "";
  }

  return `<ul>${items.map((item) => `<li>${text(item)}</li>`).join("")}</ul>`;
}

function renderExperience(resume: Resume) {
  return section(
    "Experience",
    resume.experience
      .map(
        (role) => `
          <article class="entry">
            <div class="entry-header">
              <div>
                <h3>${text(role.position)}</h3>
                <p>${joinDefined([role.company, role.location], " · ")}</p>
              </div>
              <span>${text(role.startDate)} - ${text(role.endDate)}</span>
            </div>
            ${list(role.highlights)}
          </article>
        `,
      )
      .join(""),
  );
}

function renderProjects(resume: Resume) {
  return section(
    "Projects",
    resume.projects
      .map(
        (project) => `
          <article class="entry">
            <h3>${text(project.title)}</h3>
            <p>${joinDefined([project.role, project.client], " · ")}</p>
            ${list(project.highlights)}
          </article>
        `,
      )
      .join(""),
  );
}

function renderEducation(resume: Resume) {
  return section(
    "Education",
    resume.education
      .map(
        (item) => `
          <article class="entry">
            <div class="entry-header">
              <div>
                <h3>${text(item.institution)}</h3>
                <p>${text(item.degree)}, ${text(item.area)}</p>
              </div>
              <span>${text(item.startDate)} - ${text(item.endDate)}</span>
            </div>
          </article>
        `,
      )
      .join(""),
  );
}

function renderSkills(resume: Resume) {
  return section(
    "Skills",
    resume.skills
      .map(
        (skill) => `
          <article class="compact-entry">
            <h3>${text(skill.category)}</h3>
            <p>${skill.items.map((item) => text(item)).join(", ")}</p>
          </article>
        `,
      )
      .join(""),
  );
}

function renderSimpleList(title: string, values: string[]) {
  return section(
    title,
    values.map((value) => `<span class="pill">${text(value)}</span>`).join(""),
  );
}

function renderLanguages(resume: Resume) {
  return section(
    "Languages",
    resume.languages
      .map(
        (language) => `
          <article class="compact-entry">
            <h3>${text(language.name)}</h3>
            <p>${text(language.proficiency)}</p>
          </article>
        `,
      )
      .join(""),
  );
}

function renderCertifications(resume: Resume) {
  return section(
    "Certifications",
    resume.certifications
      .map(
        (certification) => `
          <article class="compact-entry">
            <h3>${text(certification.name)}</h3>
            <p>${joinDefined([certification.issuer, certification.date], " · ")}</p>
          </article>
        `,
      )
      .join(""),
  );
}

function renderAwards(resume: Resume) {
  return section(
    "Awards",
    resume.awards
      .map(
        (award) => `
          <article class="entry">
            <div class="entry-header">
              <div>
                <h3>${text(award.title)}</h3>
                <p>${text(award.issuer)}</p>
              </div>
              <span>${text(award.date)}</span>
            </div>
            <p>${text(award.summary)}</p>
          </article>
        `,
      )
      .join(""),
  );
}

function renderPublications(resume: Resume) {
  return section(
    "Publications",
    resume.publications
      .map(
        (publication) => `
          <article class="entry">
            <div class="entry-header">
              <div>
                <h3>${text(publication.title)}</h3>
                <p>${joinDefined([publication.publisher, publication.url], " · ")}</p>
              </div>
              <span>${text(publication.date)}</span>
            </div>
            <p>${text(publication.summary)}</p>
          </article>
        `,
      )
      .join(""),
  );
}

function renderMemberships(resume: Resume) {
  return section(
    "Memberships",
    resume.memberships
      .map(
        (membership) => `
          <article class="compact-entry">
            <h3>${text(membership.organization)}</h3>
            <p>${joinDefined(
              [
                membership.role,
                joinDefined([membership.startDate, membership.endDate], " - "),
              ],
              " · ",
            )}</p>
          </article>
        `,
      )
      .join(""),
  );
}

function renderReferences(resume: Resume) {
  return section(
    "References",
    resume.references
      .map(
        (reference) => `
          <article class="compact-entry">
            <h3>${text(reference.name)}</h3>
            <p>${joinDefined([reference.relationship, reference.contact], " · ")}</p>
          </article>
        `,
      )
      .join(""),
  );
}

function renderBody(resume: Resume) {
  return `
    ${section("Summary", `<p>${text(resume.summary)}</p>`)}
    ${renderSimpleList("Core Competencies", resume.core_competencies)}
    ${renderExperience(resume)}
    ${renderProjects(resume)}
    <div class="grid">
      <div>
        ${renderSkills(resume)}
        ${renderEducation(resume)}
        ${renderCertifications(resume)}
        ${renderLanguages(resume)}
      </div>
      <div>
        ${renderAwards(resume)}
        ${renderPublications(resume)}
        ${renderMemberships(resume)}
        ${renderReferences(resume)}
      </div>
    </div>
  `;
}

function templateClass(templateId: TemplateId) {
  return `template-${templateId}`;
}

export function renderResumePdfHtml(resume: Resume, templateId: TemplateId) {
  const pageSize = resume.design.page.size === "us-letter" ? "Letter" : "A4";
  const textAlign =
    resume.design.typography.alignment === "justified" ? "justify" : "left";
  const topNote = resume.design.page.show_top_note
    ? `<p class="top-note">Resume generated with ResumeForge</p>`
    : "";
  const footer = resume.design.page.show_footer
    ? `<footer>Last updated in ResumeForge</footer>`
    : "";

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${text(resume.basics.name)} Resume</title>
    <style>
      @page { size: ${pageSize}; margin: 0; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        background: #ffffff;
        color: ${text(resume.design.colors.body)};
        font-family: ${text(resume.design.typography.font_family)}, Arial, Helvetica, sans-serif;
        font-size: 13px;
        line-height: ${text(resume.design.typography.line_spacing)};
        text-align: ${textAlign};
      }
      .page {
        min-height: 297mm;
        padding: ${text(resume.design.page.top_margin)}
          ${text(resume.design.page.right_margin)}
          ${text(resume.design.page.bottom_margin)}
          ${text(resume.design.page.left_margin)};
      }
      header {
        border-bottom: 1px solid #cbd5e1;
        padding-bottom: 14px;
      }
      h1, h2, h3, p { margin: 0; }
      h1 {
        color: ${text(resume.design.colors.name)};
        font-size: 30px;
        line-height: 1.1;
      }
      .headline {
        margin-top: 6px;
        color: ${text(resume.design.colors.headline)};
        font-size: 16px;
      }
      .contact {
        margin-top: 10px;
        color: ${text(resume.design.colors.connections)};
        font-size: 12px;
      }
      .section {
        break-inside: avoid;
        margin-top: 20px;
      }
      h2 {
        color: ${text(resume.design.colors.section_titles)};
        font-size: 11px;
        letter-spacing: 0;
        text-transform: uppercase;
      }
      h3 {
        font-size: 14px;
      }
      .entry, .compact-entry {
        break-inside: avoid;
        margin-top: 10px;
      }
      .entry-header {
        display: flex;
        gap: 16px;
        justify-content: space-between;
      }
      .entry-header span,
      .entry p,
      .compact-entry p {
        color: #64748b;
      }
      .entry-header span {
        text-align: ${text(resume.design.typography.date_and_location_column_alignment)};
      }
      ul {
        margin: 6px 0 0;
        padding-left: 18px;
      }
      .grid {
        display: grid;
        gap: 22px;
        grid-template-columns: 1fr 1fr;
      }
      .pill {
        border: 1px solid #cbd5e1;
        border-radius: 4px;
        display: inline-block;
        margin: 8px 6px 0 0;
        padding: 3px 7px;
      }
      body.template-ats,
      .template-ats .page {
        font-size: 12px;
      }
      .template-ats header {
        text-align: center;
      }
      .template-minimal header {
        border-bottom: 0;
      }
      .template-executive .page {
        border-left: 12mm solid #e2e8f0;
      }
      .template-harvard body {
        font-family: Georgia, "Times New Roman", serif;
      }
      .template-harvard header {
        text-align: center;
      }
      .top-note,
      footer {
        color: ${text(resume.design.colors.footer)};
        font-size: 11px;
        text-align: center;
      }
      .top-note {
        margin: 0 0 10px;
        color: ${text(resume.design.colors.top_note)};
      }
      footer {
        margin-top: 18px;
      }
    </style>
  </head>
  <body class="${templateClass(templateId)}">
    <main class="page">
      ${topNote}
      <header>
        <h1>${text(resume.basics.name)}</h1>
        <p class="headline">${text(resume.basics.headline)}</p>
        <p class="contact">${joinDefined(
          [
            resume.basics.email,
            resume.basics.phone,
            resume.basics.website,
            resume.basics.location.city,
            resume.basics.location.country,
          ],
          " | ",
        )}</p>
      </header>
      ${renderBody(resume)}
      ${footer}
    </main>
  </body>
</html>`;
}
