# Build a Modern Interactive Mathematics Tools Platform

Build a production-quality, modern, responsive web application called **Math Tools**.

The application is a collection of interactive mathematics tools designed primarily for students, teachers, and general users.

The main goal is to create a website that feels like a modern educational mathematics platform rather than a collection of simple calculators.

## Technology Stack

Use:

* SvelteKit
* TypeScript
* Tailwind CSS
* Vite
* Lucide icons or another lightweight icon library
* KaTeX or MathJax for mathematical notation
* SVG and/or Canvas for interactive mathematical visualizations
* No backend or database for the initial version
* All calculations should run locally in the browser whenever possible
* The application must be deployable as a static site

Do NOT use Laravel, PHP, MySQL, or a server-side API unless there is a strong technical reason.

Prioritize:

* Fast loading
* Small bundle size
* Excellent mobile experience
* Accessibility
* Clean architecture
* Reusable components
* Maintainability
* Offline-friendly calculations where possible

---

# Application Structure

Create a scalable route structure such as:

/math

/math/tripel-pythagoras
/math/teorema-pythagoras
/math/fpb-kpk
/math/persamaan-kuadrat
/math/faktorisasi
/math/operasi-bilangan
/math/pecahan
/math/persen
/math/rasio
/math/perbandingan
/math/pangkat
/math/akar
/math/logaritma
/math/eksponen
/math/aljabar
/math/limit
/math/turunan
/math/integral
/math/matriks
/math/spldv
/math/spltv
/math/statistika
/math/probabilitas
/math/kombinatorika
/math/geometri
/math/bangun-datar
/math/bangun-ruang
/math/trigonometri
/math/vektor
/math/koordinat
/math/grafik-fungsi
/math/transformasi
/math/diagram-venn
/math/diagram-cartesius
/math/garis-bilangan
/math/konversi
/math/kalkulator

The architecture must make it easy to add new mathematics tools later without modifying unrelated components.

---

# Main Homepage

Create:

/math

The homepage should be an attractive mathematics tools dashboard.

Include:

* Hero section
* Search mathematics tools
* Categories
* Popular tools
* Recently used tools
* Interactive tools
* Educational tools
* Quick calculator
* Responsive tool cards

Categories could include:

1. Aritmetika
2. Aljabar
3. Geometri
4. Trigonometri
5. Kalkulus
6. Statistika
7. Probabilitas
8. Matriks
9. Grafik & Visualisasi
10. Himpunan
11. Transformasi
12. Kalkulator

Each tool card should contain:

* Icon
* Tool name
* Short description
* Category
* "Buka" action

The interface should remain clean even when there are hundreds of tools.

---

# Design Direction

Create a modern educational UI.

Visual characteristics:

* Minimal
* Clean
* Professional
* Friendly
* Modern
* Spacious
* Excellent typography
* Rounded cards
* Subtle shadows
* Clear hierarchy
* Excellent dark mode
* Responsive on phones, tablets, and desktops

Avoid:

* Old-fashioned calculator UI
* Excessive gradients
* Excessive animations
* Cluttered interfaces
* Huge navigation menus
* Excessive decorative elements

The application should feel similar in quality to a modern SaaS/productivity application.

---

# Mobile First

Mobile support is extremely important.

The application must work excellently on:

* Android phones
* iPhones
* Tablets
* Desktop
* Large monitors

Design mobile-first.

Controls should be easy to operate using touch.

Avoid tiny buttons, tiny mathematical inputs, and horizontal scrolling whenever possible.

Graphs and diagrams must resize automatically.

---

# Mathematics Rendering

Use KaTeX or MathJax for formulas.

Mathematical expressions should be rendered beautifully.

Examples:

Pythagorean theorem:

a² + b² = c²

Quadratic equation:

ax² + bx + c = 0

Use proper mathematical typography instead of displaying formulas as plain text whenever appropriate.

Allow formulas to be copied.

---

# Interactive Tools

The most important characteristic of this application is INTERACTIVITY.

Tools should not merely display a result.

Whenever appropriate, users should be able to manipulate inputs and immediately see the mathematical visualization change.

Examples:

* Sliders
* Number inputs
* Checkboxes
* Select boxes
* Drag handles
* Interactive coordinate points
* Zoom
* Pan
* Reset view
* Show/hide elements

Calculations should update instantly.

Avoid unnecessary "Submit" buttons when live calculation is practical.

---

# Tool: Tripel Pythagoras

Create:

/math/tripel-pythagoras

Features:

* Input maximum number N
* Option for primitive triples
* Generate Pythagorean triples
* Display results in a table
* Show a visual right triangle
* Display a² + b² = c²
* Allow sorting
* Allow copying results
* Responsive table

Example:

3, 4, 5

5, 12, 13

8, 15, 17

7, 24, 25

Provide an explanation of how the triples are generated.

---

# Tool: FPB & KPK

Create:

/math/fpb-kpk

Features:

* Enter two or more numbers
* Calculate FPB
* Calculate KPK
* Show prime factorization
* Show calculation steps
* Show visual explanation where appropriate

Support Indonesian terminology:

FPB = Faktor Persekutuan Terbesar

KPK = Kelipatan Persekutuan Terkecil

---

# Tool: Persamaan Kuadrat

Create:

/math/persamaan-kuadrat

Allow:

ax² + bx + c = 0

Inputs:

a
b
c

Display:

* Discriminant
* Roots
* Vertex
* Axis of symmetry
* Minimum/maximum
* Graph
* Mathematical steps

The graph should update immediately when coefficients change.

---

# Tool: Faktorisasi

Create:

/math/faktorisasi

Support:

* Integer factorization
* Prime factorization
* Polynomial factorization where practical

Show the calculation process.

---

# Tool: Grafik Fungsi

Create:

/math/grafik-fungsi

This should be one of the most advanced tools.

Allow users to enter functions such as:

y = x²

y = 2x + 3

y = sin(x)

y = cos(x)

y = tan(x)

y = |x|

y = √x

y = log(x)

Allow multiple functions simultaneously.

Example:

f(x) = x²

g(x) = 2x + 1

Display them on the same coordinate plane.

Features:

* Interactive graph
* Zoom
* Pan
* Reset
* Grid
* X/Y axes
* Function labels
* Adjustable domain
* Adjustable range
* Multiple functions
* Show intersections where practical
* Responsive SVG/Canvas
* Dark mode

The graph must remain usable on mobile.

Use a suitable lightweight mathematical graphing implementation. Do not implement a fragile graph renderer from scratch if a mature lightweight library is appropriate.

---

# Tool: Transformasi Geometri

Create:

/math/transformasi

Support:

* Translation
* Reflection
* Rotation
* Dilation

Allow users to manipulate:

* Points
* Lines
* Triangles
* Rectangles
* Polygons

Show original and transformed objects simultaneously.

Provide controls such as:

Translation:
dx
dy

Rotation:
angle
center

Reflection:
x-axis
y-axis
custom line where practical

Dilation:
scale factor
center

The visualization should update immediately.

---

# Tool: Diagram Venn

Create:

/math/diagram-venn

Create a highly interactive Venn diagram tool.

Support:

* 2 sets
* 3 sets
* Set labels
* Set values
* Intersection
* Union
* Difference
* Complement
* Dynamic visualization

Example:

A = {1,2,3,4}

B = {3,4,5,6}

The diagram should dynamically highlight:

A ∩ B

A ∪ B

A − B

B − A

Aᶜ

When the user changes the sets, the diagram should update immediately.

Allow users to click regions of the diagram to inspect which elements belong to that region.

---

# Geometry Tools

Create interactive tools for:

* Square
* Rectangle
* Triangle
* Circle
* Trapezoid
* Parallelogram
* Rhombus
* Kite
* Polygon
* Cube
* Cuboid
* Cylinder
* Cone
* Sphere
* Prism
* Pyramid

For each applicable tool provide:

* Area
* Perimeter
* Volume
* Surface area
* Interactive diagram
* Dimension inputs
* Formula
* Calculation steps

---

# Statistics Tools

Include tools for:

* Mean
* Median
* Mode
* Range
* Variance
* Standard deviation
* Quartiles
* Percentiles
* Frequency table
* Histogram
* Bar chart
* Pie chart
* Scatter plot
* Box plot

Allow users to paste data.

Example:

10, 12, 14, 15, 18, 20

Calculate statistics immediately.

---

# Probability Tools

Include:

* Basic probability
* Permutation
* Combination
* Binomial probability
* Probability distribution
* Dice simulator
* Coin simulator

Where appropriate, include interactive visualization.

---

# Matrix Tools

Create:

/math/matriks

Support:

* Matrix addition
* Matrix subtraction
* Matrix multiplication
* Transpose
* Determinant
* Inverse
* Rank
* Eigenvalues where practical

Provide matrix editors that work well on mobile.

---

# Linear Equation Tools

Include:

* SPLDV
* SPLTV
* Linear equation
* System of equations

Provide both:

* Numerical solution
* Graphical visualization

---

# Number Tools

Include:

* Prime numbers
* Prime factorization
* GCD
* LCM
* Divisibility
* Even/odd
* Number converter
* Binary
* Decimal
* Hexadecimal
* Roman numerals

---

# Trigonometry

Include:

* Sin
* Cos
* Tan
* Inverse trigonometry
* Unit circle
* Triangle solver
* Law of sines
* Law of cosines

Create an interactive unit-circle visualization.

Users should be able to drag the angle.

Update:

* angle
* sin
* cos
* tan
* coordinates

in real time.

---

# Calculus

Include tools for:

* Limits
* Derivatives
* Integrals
* Tangent line
* Area under curve

For graphable functions, show the function and relevant calculus visualization.

For example:

f(x) = x²

Show:

* f(x)
* f'(x)
* tangent line
* selected point

where appropriate.

---

# Coordinate Geometry

Include:

* Distance between points
* Midpoint
* Slope
* Line equation
* Circle equation
* Intersection
* Coordinate plane

Make the coordinate plane interactive.

Allow users to drag points and see calculations update.

---

# Shared Interactive Components

Build reusable components instead of implementing each tool independently.

Create components such as:

* MathInput
* NumberInput
* FormulaDisplay
* ResultCard
* CalculationSteps
* MathGraph
* CoordinatePlane
* GeometryCanvas
* SliderControl
* ToolCard
* CategoryCard
* InteractiveTable
* MatrixInput
* SetInput
* VennDiagram
* TriangleDiagram
* ShapeDiagram
* FunctionInput
* GraphControls
* CopyButton
* ResetButton
* ShareButton

Components should be reusable across multiple tools.

---

# Architecture

Use a modular architecture.

Separate:

1. UI components
2. Mathematical algorithms
3. Visualization
4. Tool metadata
5. Routing

Mathematical calculations should not be embedded directly inside UI components.

For example:

src/

lib/

components/

math/

algorithms/

visualizations/

tools/

utils/

routes/

Keep pure mathematical functions independent and testable.

Example:

src/lib/math/gcd.ts

src/lib/math/lcm.ts

src/lib/math/quadratic.ts

src/lib/math/pythagorean.ts

src/lib/math/statistics.ts

src/lib/math/matrix.ts

---

# Tool Registry

Create a central tool registry.

For example:

tools.ts

Each tool should have metadata:

* id
* title
* description
* category
* icon
* route
* keywords
* popular
* educationalLevel

This makes it easy to add hundreds of tools later.

---

# Search

Implement global tool search.

Users should be able to search:

"pythagoras"

"fpb"

"persamaan kuadrat"

"turunan"

"matrix"

"venn"

"grafik"

Search should return relevant tools instantly.

---

# Favorites

Allow users to favorite tools.

For the initial version, store preferences in localStorage.

No account is required.

---

# Recently Used

Store recently opened tools in localStorage.

Display them on the homepage.

---

# Theme

Support:

* Light
* Dark
* System

Persist theme preference.

---

# Accessibility

Follow accessibility best practices.

Requirements:

* Keyboard navigation
* Proper labels
* ARIA where appropriate
* Sufficient contrast
* Focus states
* Screen-reader-friendly controls
* Do not rely only on color to communicate information

---

# Performance

Performance is a major requirement.

Optimize for:

* Fast initial load
* Lazy loading heavy visualization modules
* Code splitting
* Tree shaking
* Minimal JavaScript
* Avoid unnecessary dependencies
* Avoid rendering huge DOM trees
* Debounce expensive calculations where necessary

Heavy graphing/visualization functionality should be loaded only when required.

---

# SEO

Each tool should have:

* Unique title
* Meta description
* Open Graph metadata
* Semantic HTML
* SEO-friendly URLs

Example:

/math/tripel-pythagoras

Title:

"Tripel Pythagoras — Kalkulator & Visualisasi Interaktif"

Description:

"Temukan tripel Pythagoras dengan kalkulator interaktif dan visualisasi segitiga siku-siku."

---

# Educational Content

Each tool should not only calculate.

Include an educational explanation:

* Apa itu?
* Rumus
* Cara menghitung
* Contoh
* Langkah penyelesaian
* Tips
* FAQ

The educational content should be concise and understandable for Indonesian students.

---

# UX Principle

The user should be able to:

1. Open a tool
2. Enter values
3. Immediately see the result
4. Understand how the result was obtained
5. See a visualization when useful
6. Copy/share the result

without unnecessary navigation.

---

# Responsive Layout

Desktop:

Sidebar + main content.

Tablet:

Collapsible sidebar.

Mobile:

Bottom navigation or compact top navigation.

Tool pages should use:

* Input panel
* Result panel
* Visualization panel
* Explanation panel

On mobile, stack these vertically.

---

# Error Handling

Handle invalid inputs gracefully.

Examples:

* Empty input
* Invalid number
* Division by zero
* Negative values where not allowed
* Invalid mathematical expression
* Extremely large input

Show friendly Indonesian error messages.

Never crash the application.

---

# Testing

Add unit tests for mathematical algorithms.

Especially test:

* GCD
* LCM
* Prime factorization
* Pythagorean triples
* Quadratic equations
* Statistics
* Matrix operations
* Geometry calculations
* Probability calculations

Do not test mathematical calculations only through UI tests.

Pure algorithms should have independent unit tests.

---

# Important Development Rule

Do not attempt to build every mathematics tool at once.

First build a high-quality foundation and implement these tools as the MVP:

1. Tripel Pythagoras
2. FPB & KPK
3. Persamaan Kuadrat
4. Faktorisasi
5. Kalkulator
6. Grafik Fungsi
7. Transformasi Geometri
8. Diagram Venn
9. Geometri dasar
10. Statistik dasar

After the architecture is stable, add additional tools incrementally.

---

# Final Quality Target

The finished application should feel like a serious modern mathematics platform.

It should NOT feel like:

* A basic calculator website
* A Bootstrap template
* A collection of unrelated pages
* A school assignment

It should feel like:

**"A modern interactive mathematics laboratory for Indonesian students and teachers."**

Prioritize:

**UX > correctness > performance > visual polish > number of features.**

Mathematical correctness is critical.

Every mathematical algorithm must be verified with tests and known examples.

Build the foundation first, then implement the MVP tools, then expand the platform.
