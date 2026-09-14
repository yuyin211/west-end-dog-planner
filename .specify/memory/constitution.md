<!--
Sync Impact Report
Version change: N/A -> 1.0.0
Modified principles:
- Placeholder principles -> I. Prototype-First
- Placeholder principles -> II. Mobile-First Simplicity
- Placeholder principles -> III. Progressive Disclosure
- Placeholder principles -> IV. Research-Driven Design
- Placeholder principles -> V. Real Geography, Simulated Dynamic Data
- Placeholder principles -> VI. Minimal Technical Complexity
- Placeholder principles -> VII. Glanceable Active Navigation
- Placeholder principles -> VIII. Contextual Dynamic Assistance
- Placeholder principles -> IX. User-Controlled Adaptation
- Placeholder principles -> X. Lightweight Personalisation
- Placeholder principles -> XI. Transparent Simulation
- Placeholder principles -> XII. Maintain Prototype Scope
Added sections:
- Prototype Boundaries
- Design and Validation Workflow
Removed sections:
- Placeholder Section 2
- Placeholder Section 3
Follow-up TODOs: None
-->
# West End Dog Planner Constitution

## Core Principles

### I. Prototype-First

The project MUST prioritise realistic interaction and usability testing over production
infrastructure. Backend services, authentication, databases, and production architecture MUST NOT
be introduced unless they are necessary to demonstrate or test the prototype experience.

Rationale: The university HCI goal is to evaluate the interaction concept, not to prove a
production system architecture.

### II. Mobile-First Simplicity

The interface MUST be designed primarily for smartphone use. Screens MUST remain visually simple,
easy to scan, and focused on the user's immediate task. Dense information layouts MUST be avoided
unless they are required for a specific usability test.

Rationale: The prototype is intended for mobile outing planning and navigation contexts where
attention is limited.

### III. Progressive Disclosure

The prototype MUST show only information relevant to the user's current task. Secondary details
MUST appear on demand or when contextually relevant, rather than competing with the primary
decision or action.

Rationale: Progressive disclosure supports faster comprehension during planning and active outings.

### IV. Research-Driven Design

Features MUST be based on identified research findings, design requirements, or clearly labelled
design hypotheses. Additions that are not connected to the project goals MUST be deferred or
removed from scope.

Rationale: Every feature needs to support an HCI research question, requirement, or usability test.

### V. Real Geography, Simulated Dynamic Data

The prototype MUST use a real West End, Brisbane map and realistic geographic locations. Dynamic
information such as crowd levels, weather conditions, route changes, alerts, and facility status
MAY use simulated prototype data when live data is unnecessary or unavailable.

Rationale: Real geography makes route planning credible, while simulation keeps the prototype
feasible for course delivery.

### VI. Minimal Technical Complexity

Implementation MUST favour simple front-end techniques suitable for a university prototype.
Unnecessary APIs, backend systems, databases, user authentication, and production integrations MUST
be avoided.

Rationale: Technical effort needs to serve the prototype interaction rather than expand the system
beyond its evaluation needs.

### VII. Glanceable Active Navigation

During an active outing, the prototype MUST prioritise the current route, next destination,
distance or estimated time to the next destination, and distance to nearby essential facilities
such as drinking water and bins. Active navigation UI MUST use simple icons, short labels, and
minimal text.

Rationale: Active navigation must support quick decisions while walking with a dog.

### VIII. Contextual Dynamic Assistance

Dynamic information such as crowd changes MUST remain secondary unless it affects the current
outing. Alerts MUST appear only when they may require a user decision.

Rationale: Assistance is useful when it changes the user's next action; otherwise it becomes noise.

### IX. User-Controlled Adaptation

When conditions change, the prototype MUST provide clear alternatives such as a quieter route, but
the user MUST remain in control of whether to switch.

Rationale: The system supports decision-making without taking agency away from the user.

### X. Lightweight Personalisation

Dog preferences MAY be saved for reuse, but the prototype MUST avoid requiring lengthy setup.
Users MUST be able to continue without creating a complex profile.

Rationale: Personalisation improves relevance without blocking quick exploration or testing.

### XI. Transparent Simulation

Simulated information MUST NOT imply that it is live, verified, or accurate real-time data. Any
simulated dynamic information MUST be presented in a way that remains honest during demonstration
and usability testing.

Rationale: Participants and evaluators need to understand the prototype's limits without losing
the ability to test the intended interaction.

### XII. Maintain Prototype Scope

The prototype MUST focus on testing the core experience: planning a dog-inclusive outing,
reviewing a suggested itinerary, navigating the outing, viewing relevant facilities, and adapting
when conditions change. Feature expansion beyond this scope MUST be justified by a direct research
or usability testing need.

Rationale: A clear scope protects the prototype from becoming a general-purpose travel or pet-care
application.

## Prototype Boundaries

This project is a mobile-first web prototype for a dog-inclusive outing planner in West End,
Brisbane. It is developed for a university HCI course and is intended for prototype demonstration
and usability testing.

The prototype is not a production-ready application. The project MUST avoid production-only
requirements such as account security, scalable infrastructure, persistent server storage, payment
flows, analytics pipelines, or operational monitoring unless a specific HCI prototype scenario
requires a lightweight simulation of that behaviour.

Prototype data MAY be static, mocked, or locally simulated when doing so supports realistic
interaction. Simulated data MUST remain distinguishable from live or verified information.

## Design and Validation Workflow

Design and implementation work MUST be traceable to at least one of the following: a research
finding, a design requirement, a clearly labelled design hypothesis, or a usability testing goal.

Before adding a new feature, the project MUST confirm that it supports one of the core prototype
experiences: planning an outing, reviewing an itinerary, navigating an outing, viewing relevant
facilities, or adapting to changed conditions.

Usability testing readiness MUST prioritise complete and believable user flows over production
hardening. Review of major changes MUST check mobile usability, progressive disclosure, simulation
transparency, and prototype scope.

## Governance

This constitution supersedes other project guidance when decisions affect prototype scope,
interaction design priorities, data realism, or technical complexity.

Amendments MUST be documented in this file with a Sync Impact Report, updated version, and ISO
formatted amendment date. Changes MUST preserve the university HCI prototype purpose unless the
project brief changes.

Versioning follows semantic versioning for governance changes:

- MAJOR: backward-incompatible changes to project purpose, scope, or core principles.
- MINOR: new principles or materially expanded governance guidance.
- PATCH: wording clarifications, typo fixes, or non-semantic refinements.

Compliance review MUST occur when creating specifications, planning implementation, generating
tasks, and reviewing completed prototype changes. Any deliberate deviation from this constitution
MUST be recorded in the relevant specification or task artifact with a brief rationale.

**Version**: 1.0.0 | **Ratified**: 2026-09-14 | **Last Amended**: 2026-09-14
