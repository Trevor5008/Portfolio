import { describe, it, expect } from "vitest";
import { projects } from "../data/projects";

// Case studies are written for a visitor with about two minutes.
// These budgets keep them skimmable as new projects are added.
// Alt text, URLs and link labels are not counted: accessibility and
// navigation should never be trimmed to meet a word budget.

const words = (text) =>
  typeof text === "string"
    ? text.split(/\s+/).filter((token) => /[\p{L}\p{N}]/u.test(token)).length
    : 0;

const BUDGETS = {
  tldr: 25,
  highlightCount: 3,
  highlight: 8,
  problem: 50,
  contributionCount: 3,
  contribution: 25,
  solution: 60,
  architecture: 70,
  stackNoteCount: 4,
  stackNote: 15,
  decisionCount: 3,
  decisionOptions: 15,
  decisionChoicePlusTradeoff: 40,
  caption: 15,
  evidenceLinkCount: 6,
  evidenceLinkNote: 12,
  availabilityNote: 35,
  outcome: 40,
  limitations: 45,
  listItemCount: 3,
  listItem: 20,
  total: 600,
};

const totalWords = (cs) =>
  [
    cs.tldr,
    ...(cs.highlights || []),
    cs.availabilityNote,
    cs.problem,
    ...(cs.contribution || []),
    cs.solution,
    cs.architecture,
    ...(cs.stackNotes || []).map((n) => n.why),
    ...(cs.decisions || []).flatMap((d) => [d.options, d.choice, d.tradeoff]),
    ...(cs.evidence || []).map((e) => e.caption),
    ...(cs.evidenceLinks || []).map((l) => l.note),
    cs.outcome,
    cs.limitations,
    ...(cs.limitationItems || []),
    ...(cs.deferredItems || []),
  ].reduce((sum, text) => sum + words(text), 0);

const expectWithin = (label, count, max) => {
  expect(count, `${label}: ${count} > ${max}`).toBeLessThanOrEqual(max);
};

describe("case-study word budgets", () => {
  const written = projects.filter((p) => totalWords(p.caseStudy || {}) > 0);

  it("has at least one written case study to check", () => {
    expect(written.length).toBeGreaterThan(0);
  });

  for (const project of written) {
    const cs = project.caseStudy;

    it(`${project.slug} stays within its section budgets`, () => {
      const p = project.slug;
      expectWithin(`${p} tldr`, words(cs.tldr), BUDGETS.tldr);
      expectWithin(`${p} problem`, words(cs.problem), BUDGETS.problem);
      expectWithin(`${p} solution`, words(cs.solution), BUDGETS.solution);
      expectWithin(
        `${p} architecture`,
        words(cs.architecture),
        BUDGETS.architecture,
      );
      expectWithin(
        `${p} availabilityNote`,
        words(cs.availabilityNote),
        BUDGETS.availabilityNote,
      );
      expectWithin(`${p} outcome`, words(cs.outcome), BUDGETS.outcome);
      expectWithin(
        `${p} limitations`,
        words(cs.limitations),
        BUDGETS.limitations,
      );

      const highlights = cs.highlights || [];
      expectWithin(`${p} highlights`, highlights.length, BUDGETS.highlightCount);
      highlights.forEach((h, i) =>
        expectWithin(`${p} highlight[${i}]`, words(h), BUDGETS.highlight),
      );

      const contribution = cs.contribution || [];
      expectWithin(
        `${p} contribution items`,
        contribution.length,
        BUDGETS.contributionCount,
      );
      contribution.forEach((c, i) =>
        expectWithin(`${p} contribution[${i}]`, words(c), BUDGETS.contribution),
      );

      const stackNotes = cs.stackNotes || [];
      expectWithin(`${p} stackNotes`, stackNotes.length, BUDGETS.stackNoteCount);
      stackNotes.forEach((n, i) =>
        expectWithin(`${p} stackNotes[${i}]`, words(n.why), BUDGETS.stackNote),
      );

      const decisions = cs.decisions || [];
      expectWithin(`${p} decisions`, decisions.length, BUDGETS.decisionCount);
      decisions.forEach((d, i) => {
        expectWithin(
          `${p} decisions[${i}].options`,
          words(d.options),
          BUDGETS.decisionOptions,
        );
        expectWithin(
          `${p} decisions[${i}] choice+tradeoff`,
          words(d.choice) + words(d.tradeoff),
          BUDGETS.decisionChoicePlusTradeoff,
        );
      });

      (cs.evidence || []).forEach((e, i) =>
        expectWithin(`${p} evidence[${i}].caption`, words(e.caption), BUDGETS.caption),
      );

      const links = cs.evidenceLinks || [];
      expectWithin(`${p} evidenceLinks`, links.length, BUDGETS.evidenceLinkCount);
      links.forEach((l, i) =>
        expectWithin(
          `${p} evidenceLinks[${i}].note`,
          words(l.note),
          BUDGETS.evidenceLinkNote,
        ),
      );

      for (const key of ["limitationItems", "deferredItems"]) {
        const items = cs[key] || [];
        expectWithin(`${p} ${key}`, items.length, BUDGETS.listItemCount);
        items.forEach((item, i) =>
          expectWithin(`${p} ${key}[${i}]`, words(item), BUDGETS.listItem),
        );
      }
    });

    it(`${project.slug} reads in about two minutes (≤ ${BUDGETS.total} words)`, () => {
      expectWithin(`${project.slug} total`, totalWords(cs), BUDGETS.total);
    });
  }
});
