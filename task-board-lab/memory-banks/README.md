# Memory Banks — Task Board Lab

This directory contains institutional knowledge, conventions, and context for working on the task-board-lab project. Use these resources to understand the system architecture, coding standards, business domain, development processes, and team roles.

---

## Purpose

The Memory Banks serve as a single source of truth for task-board-lab project knowledge. They enable:

- **Consistency:** Ensuring all team members and AI assistants follow the same conventions and patterns
- **Onboarding:** New team members can quickly understand system design, processes, and domain language
- **Efficiency:** Reducing back-and-forth questions by documenting decisions and rationales
- **Knowledge Preservation:** Capturing institutional knowledge that would otherwise be lost
- **AI Collaboration:** Providing context for AI assistants to write code, generate documentation, and make decisions aligned with project goals

---

## How to Use

### For AI Assistants
Start with the **Quick Start** section below for recommended reading order. When working on a specific task:
1. **Clarify context** — Check the relevant memory bank sections before proposing solutions
2. **Follow conventions** — Apply coding standards and patterns documented in conventions/
3. **Use domain language** — Reference glossary terms when writing requirements or documentation
4. **Respect processes** — Follow workflow procedures when creating PRs, requesting reviews, or deploying

### For Team Members
- **Reference first** — Check memory banks before asking process questions
- **Link in discussions** — Share relevant sections when explaining decisions or standards
- **Keep updated** — Update memory banks when processes or standards change
- **Use as checklist** — Reference workflows/ before starting major development cycles

### Finding Information
- **Quick lookup** — Use the Navigation Guide below to find specific topics
- **Process questions** — Check workflows/development-process.md
- **Code questions** — Check conventions/coding-standards.md
- **Business questions** — Check domain/glossary.md
- **Architecture questions** — Check architecture/overview.md

---

## Navigation Guide

### 📐 [architecture/](architecture/) — System Design & Technical Context
**Purpose:** Understand how the system is structured, the technology stack, and deployment architecture.

- **overview.md** — High-level system design, tech stack decisions, and architecture patterns

**Use this when you need to:**
- Understand system components and their relationships
- Make informed decisions about new features or refactoring
- Understand deployment and infrastructure choices

---

### 📋 [conventions/](conventions/) — Coding Standards & Patterns
**Purpose:** Learn coding standards, testing patterns, and development best practices.

- **coding-standards.md** — Code style, naming conventions, file structure, and quality requirements

**Use this when you need to:**
- Write code that matches project standards
- Review code for compliance with project conventions
- Understand testing requirements and patterns

---

### 🎯 [domain/](domain/) — Business Terms & Rules
**Purpose:** Learn the business domain, key terms, rules, and personas that shape product decisions.

- **glossary.md** — Business terminology, product concepts, and domain-specific language

**Use this when you need to:**
- Understand what terms mean in the context of task management
- Write user stories or requirements that speak the domain language
- Understand business rules and constraints

---

### 🔄 [workflows/](workflows/) — Development & Deployment Processes
**Purpose:** Learn how work flows through development, review, and deployment stages.

- **development-process.md** — Development workflow, code review process, and deployment procedures

**Use this when you need to:**
- Understand the development lifecycle
- Know when and how to create PRs and request reviews
- Understand deployment and release processes

---

### 👥 [roles/](roles/) — Role-Specific Context
**Purpose:** Find context relevant to specific team roles and responsibilities.

**Available roles:**
- Developer — Development workflows, coding standards, debugging guidance
- QA — Testing strategies, acceptance criteria, test case development
- PM — Feature priorities, roadmap, stakeholder requirements

**Use this when you need to:**
- Understand responsibilities for your role
- Find role-specific guidance and workflows
- Coordinate across roles

---

## Quick Start

**For AI assistants:**
1. Start with [architecture/overview.md](architecture/overview.md) to understand the system
2. Review [conventions/coding-standards.md](conventions/coding-standards.md) before writing code
3. Check [domain/glossary.md](domain/glossary.md) for business terminology
4. Reference [workflows/development-process.md](workflows/development-process.md) for process questions

**For specific tasks:**
- Building a feature → architecture → domain → conventions → workflows
- Writing tests → conventions → domain → workflows
- Reviewing code → conventions → workflows
- Discussing requirements → domain → workflows

---

## Maintenance

Memory banks require regular care to remain useful and accurate.

### Regular Reviews
- **Monthly:** Review architecture/ for design changes or new decisions
- **Quarterly:** Audit conventions/ to ensure they reflect current practices
- **As needed:** Update domain/ and workflows/ when business rules or processes change
- **Upon release:** Update relevant sections after each major release cycle

### Update Triggers
Update memory banks when:
- **Processes change** — Update workflows/ documents immediately
- **Standards evolve** — Update conventions/ and reflect in all related docs
- **New architecture decisions made** — Document in architecture/
- **Domain rules change** — Update domain/glossary.md with new terms and rules
- **Roles or responsibilities shift** — Update roles/ documents

### Quality Standards
- **Accuracy:** Verify information is current before committing updates
- **Clarity:** Use plain language; avoid jargon without definition
- **Completeness:** Include examples and edge cases where relevant
- **Consistency:** Follow existing document structure and formatting
- **References:** Link to related sections within memory banks

### Review Checklist
Before merging changes to memory banks:
- [ ] Information is current and accurate
- [ ] Links are valid and use relative paths
- [ ] Examples are clear and relevant
- [ ] No conflicting information across documents
- [ ] Changes are reflected in related documents
- [ ] Format follows existing patterns

---

## Contributing to Memory Banks

When updating memory bank documents:
- Keep information concise and well-organized
- Link to related documents within memory banks
- Include examples where helpful
- Remove outdated information promptly
- Follow the quality standards outlined in the Maintenance section above
