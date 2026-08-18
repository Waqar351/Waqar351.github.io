---
title: "Making Hidden Distances Visible with Delaunay Geometry"
slug: "making-hidden-distances-visible-delaunay-geometry"
date: "2026-08-18"
status: "draft"
category: "Visual Analytics"
tags:
  - "Dimensionality Reduction"
  - "Delaunay Triangulation"
  - "Projection Distortion"
  - "Scientific Visualization"
  - "High-dimensional Data"
summary: "A technical guide to enriching t-SNE and UMAP layouts with Delaunay geometry and true high-dimensional distances—without replacing the original projection."
featuredImage:
  src: "/images/projects/dimensionality-reduction-distortion.webp"
  alt: "Point clusters connected by a geometric mesh with colored edges revealing projection distortion"
  width: 960
  height: 540
seo:
  title: "Delaunay Geometry for Dimensionality-reduction Distortion | Waqar Hassan"
  description: "Learn how Delaunay triangulation and original-space distances can reveal misleading proximity in t-SNE and UMAP layouts."
relatedResearch:
  - "visual-analytics"
  - "explainable-ai"
relatedProjects:
  - "dimensionality-reduction-distortion-cues"
relatedPublications:
  - "enriching-dimensionality-reduction-distortion-cues"
relatedPosts:
  - "four-datasets-one-misleading-tsne-story"
  - "interpreting-dimensionality-reduction-layouts"
---

Two points sit next to each other in a t-SNE/UMAP plot. The visual conclusion feels immediate: they must be similar.

But the plot shows where an algorithm placed them, not the distance between their original feature vectors. If those vectors are far apart, the projection has created a false visual neighbor. The scatterplot alone gives us no warning.

Our paper, *Enriching Dimensionality Reduction with Distortion Cues*, asks a practical design question:

> Can we place evidence from the original high-dimensional space directly into the 2D structures an analyst is already interpreting?

Our answer uses a familiar geometric object—the Delaunay triangulation—as a sparse scaffold. We construct that scaffold in the projection, measure its edges in the original space, and interpolate those measurements into a continuous visual field. The resulting view does not replace t-SNE or UMAP. It adds a diagnostic layer that helps distinguish plausible proximity from projection-induced proximity.

This article explains that pipeline, why each design choice matters, how the method scales, and where its evidence stops.

## The design problem: reveal distortion where judgments happen

A full pairwise-distance matrix contains every distance among the original samples. For <var>N</var> observations, however, it contains <var>N</var><sup>2</sup> entries. That creates two problems.

First, all-pairs computation becomes expensive as a dataset grows. Second, even when a matrix can be computed and displayed, an analyst must translate its rows and columns back to points and clusters in the scatterplot.

An alternative is to summarize distortion with a metric such as trustworthiness, continuity, precision, recall, or a rank-based score. These measures are valuable for evaluation, but a scalar summary does not necessarily tell a reader which visible relationship is suspicious. Metric-based encodings can also introduce their own approximation choices and interpretation burden.

We therefore pursued a narrower goal: preserve the analyst's 2D frame of reference while exposing selected, exact distances from the source space.

## Step 1: triangulate the projected points

Let the dimensionality-reduction layout be

```text
P = {p₁, p₂, …, pₙ}, with each pᵢ in 2D,
```

and let the corresponding original observations be

```text
X = {x₁, x₂, …, xₙ}, with each xᵢ in the high-dimensional space.
```

We construct the Delaunay triangulation <var>D</var>(<var>P</var>) over the points in the 2D layout. This creates a planar network of non-overlapping triangles whose vertices are projected samples.

Why Delaunay geometry?

- **It follows the visible layout.** Edges primarily connect points that are neighbors in the projection—the relationships a viewer is most likely to interpret.
- **It is sparse.** A planar triangulation uses far fewer connections than an all-pairs graph.
- **It partitions the visual domain.** Triangles provide local regions over which edge measurements can be interpolated.
- **It is data-agnostic.** The construction does not require class labels, a trained predictor, or an inverse projection model.

The triangulation does not claim that its edges are correct neighborhoods. It identifies the projected neighborhoods that need to be checked.

## Step 2: measure every selected edge in the original space

For a Delaunay triangle with projected vertices <var>p</var><sub>i</sub>, <var>p</var><sub>j</sub>, and <var>p</var><sub>k</sub>, we return to their corresponding source vectors <var>x</var><sub>i</sub>, <var>x</var><sub>j</sub>, and <var>x</var><sub>k</sub>. The three edge values are Euclidean distances in the original space:

```text
ℓᵢⱼ = ‖xᵢ − xⱼ‖₂
ℓⱼₖ = ‖xⱼ − xₖ‖₂
ℓₖᵢ = ‖xₖ − xᵢ‖₂
```

This distinction is essential. The visual cue is not based on the length of an edge on the screen. The edge is *selected* in 2D but *measured* in the original space.

A short projected edge with a large original-space value is exactly the kind of relationship that can mislead an analyst: the points appear close even though their feature vectors are far apart.

<figure class="blog-figure blog-figure--wide">
  <img src="/images/blog/delaunay-distortion-cues-figure-1.webp" alt="Three clusters change relative spacing during projection; a Delaunay triangle is colored from dark for short original-space distance to bright for long original-space distance" width="1065" height="430" loading="lazy" />
  <figcaption><strong>From projected proximity to original-space evidence.</strong> The projection obscures differences in cluster spacing and density. The Delaunay enrichment measures selected connections in the source space; brighter color denotes a larger original-space distance. Cropped from Fig. 1 of Hassan et al. (2026).</figcaption>
</figure>

In the figure, the purple and green samples look close after projection. Their bright connecting edge says something different: they remain far apart in the original space. The darker cyan-to-green connection represents a shorter source-space distance.

The cue turns a general warning—“projections can distort distance”—into evidence attached to a specific visible relationship.

## Step 3: turn edge values into an area-based field

Coloring only thin edges would create a dense line drawing, especially in a large scatterplot. Edge color can also be difficult to compare when many triangles overlap visually with points and cluster boundaries.

The method instead uses **triangle-edge interpolation**, a barycentric-coordinate variant, to blend the three edge values across each triangle.

For a triangle, let its source-space edge lengths be <var>a</var>, <var>b</var>, and <var>c</var>. At a location <var>x</var> inside that triangle, the interpolated value is

```text
f(x) = a·e₀(x) + b·e₁(x) + c·e₂(x),
```

where <var>e</var><sub>0</sub>, <var>e</var><sub>1</sub>, and <var>e</var><sub>2</sub> are blending weights derived from the areas of the three sub-triangles formed by <var>x</var> and the original triangle's vertices. The complete weight construction appears in Equations 2-8 of the paper.

The practical effect is more important than the notation: values defined on three edges become a continuous field inside the triangle. A sequential dark-to-bright color map then communicates shorter-to-longer distances in the original space.

This area-based representation supports two complementary readings:

- **Between clusters:** bright ridges can reveal groups placed close together even though they are far apart in the source space.
- **Inside clusters:** variation in the field can reveal source-space density differences that the projected point density conceals.

The visualization remains anchored to the scatterplot. Points, clusters, and suspicious relationships occupy the same spatial frame rather than being split across coordinated views.

## The pipeline in compact form

The method can be summarized without committing to a particular plotting library:

```text
input:
  original samples X
  two-dimensional embedding P

triangles = delaunay_triangulation(P)

for each triangle (i, j, k):
  a = euclidean_distance(X[i], X[j])
  b = euclidean_distance(X[j], X[k])
  c = euclidean_distance(X[k], X[i])

  for each display-grid location x inside the triangle:
    e0, e1, e2 = triangle_edge_weights(x, P[i], P[j], P[k])
    field[x] = a*e0 + b*e1 + c*e2

render field with a sequential color scale
overlay projected samples and optional labels
```

The dimensionality-reduction algorithm and the enrichment are separate stages. The same diagnostic can therefore be applied to layouts produced by t-SNE, UMAP, or another projection method.

## What the computational cost means in practice

The paper separates the cost of producing an embedding from the cost of enriching it.

For <var>N</var> projected samples, constructing the Delaunay triangulation takes <code>O(N log N)</code>. The continuous field is evaluated over a display grid. If <var>G</var> is the number of grid samples, triangle lookup and interpolation take <code>O(G log N)</code>. The experiments used a uniform 500 × 500 grid, so <var>G</var> = 250,000.

Because triangulation, lookup, and interpolation occur in the 2D projection domain, the paper reports that the enrichment's runtime is largely independent of the dimensionality of the original data. This contrasts with approaches that repeatedly operate on full high-dimensional pairwise-distance matrices.

The measured runtimes below come from the paper's workstation—an Intel Core i7-4930K CPU, 32 GB RAM, and NVIDIA TITAN RTX GPUs—and should be read as implementation-specific measurements, not universal benchmarks.

| Dataset | Samples | Dimensions | t-SNE (s) | UMAP (s) | CheckViz (s) | Proposed enrichment (s) |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| D1-D4 | 1.2K | 3 | 1.68 | 1.06 | 3.71 | 14.58 |
| HAR | 7.3K | 561 | 15.18 | 1.09 | 14.31 | 15.45 |
| MNIST | 10.0K | 784 | 25.76 | 1.82 | 25.88 | 17.21 |
| Aedessex | 24.0K | 27 | 56.31 | 1.28 | 42.43 | 18.76 |

**Table 1.** Average runtime reported in the paper. All grid-based methods use a 500 × 500 sampling grid.

The useful pattern is not that the proposed method is always fastest—it is not. On the small synthetic data, its fixed display-grid work dominates. As dataset size and dimensionality increase, its runtime remains comparatively stable in these experiments: 14.58 to 18.76 seconds across datasets ranging from 1,200 to 24,000 samples and 3 to 784 dimensions.

That stability makes the approach plausible as an analytical layer, but interactive systems would still need to consider grid resolution, recomputation frequency, and implementation details.

## Why use true distances instead of a learned inverse?

An inverse-projection approach tries to map a point from the 2D domain back into the original space, then reasons about stretching and shrinking through that learned or reconstructed mapping. Such approaches can be useful, but their diagnostic quality depends on the inverse model.

The Delaunay approach avoids that extra model. Every displayed value begins with a distance between two observations that actually exist in the original data. Interpolation affects how those measured edge values fill visual space; it does not invent surrogate high-dimensional samples.

This gives the view a clear semantic contract:

> The geometry comes from the projection; the measured edge values come from the original data.

That contract is simpler to explain than many composite distortion scores, and it makes the visual question explicit: are the neighbors created by this particular layout also close in the source space?

## What the visualization cannot tell you

Sparsity is both the method's advantage and its principal limitation.

The Delaunay triangulation contains only a subset of all pairwise relationships, primarily connecting points that are near each other in 2D. It is therefore well positioned to expose **false proximity**: pairs that appear near in the projection but are far in the original space.

The reverse case is harder. If two points are close in the source space but the projection places them far apart, they may never share a Delaunay edge. The enrichment can miss that **false separation**. The paper's rank-shift analysis confirms that Delaunay edges provide sparse coverage biased toward local neighborhoods induced by the embedding.

The cues also depend on the layout. Different projection algorithms, parameters, or initializations can change 2D neighborhoods and therefore change the triangulation. This is not evidence that the cue is malfunctioning; it means the cue diagnoses the specific projection supplied to it.

The right claim is consequently precise: this is a projection-aware diagnostic for selected relationships, not a complete map of all high-dimensional distances and not a proof that a cluster is “real.”

## A practical reading protocol

When using an enriched layout, read it in this order:

1. **Identify the projected structure.** Notice clusters, boundaries, gaps, and nearby groups as you would in an ordinary scatterplot.
2. **Inspect the field at the relationship of interest.** Dark regions support shorter original-space connections; bright regions signal longer ones.
3. **Separate local and global claims.** Within-cluster variation and between-cluster ridges answer different analytical questions.
4. **Check uncovered relationships elsewhere.** Use distance matrices, neighborhood metrics, alternative projections, or domain-specific measurements when a conclusion depends on pairs the triangulation may not connect.
5. **Compare projection settings.** Changing t-SNE or UMAP parameters can reveal whether the suspicious relationship persists or is layout-dependent.

The enrichment is most useful when it changes the next question an analyst asks. A bright boundary should not end the analysis; it should prevent an unsupported proximity claim and motivate inspection of the source features.

## Publication and implementation

The complete method, equations, experiments, and limitations are described in the [published *Computers & Graphics* article](https://doi.org/10.1016/j.cag.2026.104724).

The [official implementation repository](https://github.com/giva-lab/dr_layout_enrichment_cues) includes the reusable `src/distortion_cues` package, the main projection-analysis notebook, sensitivity and rank-shift analysis, plotting utilities, and datasets or loading procedures used by the experiments.

## Conclusion

Delaunay triangulation is not valuable here because triangles are visually sophisticated. It is valuable because it creates a sparse bridge between two spaces.

The projected space decides which relationships are visually at stake. The original space supplies the distances needed to evaluate them. Triangle-edge interpolation turns those measurements into a field that can be read without leaving the scatterplot.

That combination—projected geometry, original evidence, and a clear account of what remains unseen—is what makes the enrichment useful as a diagnostic rather than merely decorative.

## References

1. Hassan, W., Schlieder, A., Sadlo, F., & Nonato, L. G. (2026). “Enriching Dimensionality Reduction with Distortion Cues.” *Computers & Graphics*, 104724. <https://doi.org/10.1016/j.cag.2026.104724>
2. Aupetit, M. (2007). “Visualizing Distortions and Recovering Topology in Continuous Projection Techniques.” *Neurocomputing*, 70(7-9), 1304-1330.
3. Martins, R. M., Coimbra, D. B., Minghim, R., & Telea, A. C. (2014). “Visual Analysis of Dimensionality Reduction Quality for Parameterized Projections.” *Computers & Graphics*, 41, 26-42.
4. Nonato, L. G., & Aupetit, M. (2018). “Multidimensional Projection for Visual Analytics: Linking Techniques with Distortions, Tasks, and Layout Enrichment.” *IEEE Transactions on Visualization and Computer Graphics*, 25(8), 2650-2673.
5. Lespinats, S., & Aupetit, M. (2011). “CheckViz: Sanity Check and Topological Clues for Linear and Non-linear Mappings.” *Computer Graphics Forum*, 30, 113-125.
