---
title: "Four Different Datasets, One Misleading t-SNE Story"
slug: "four-datasets-one-misleading-tsne-story"
date: "2026-08-18"
status: "draft"
category: "Visual Analytics"
tags:
  - "Dimensionality Reduction"
  - "t-SNE"
  - "Projection Distortion"
  - "High-dimensional Data"
  - "Visual Analytics"
summary: "A controlled experiment shows how t-SNE can make datasets with different cluster spacing and density look deceptively similar—and how distortion cues reveal what the projection hides."
featuredImage:
  src: "/images/publications/dimensionality-reduction-cues.webp"
  alt: "Projected clusters connected by a geometric mesh with highlighted distance distortions"
  width: 960
  height: 540
seo:
  title: "Four Different Datasets, One Misleading t-SNE Story | Waqar Hassan"
  description: "See how t-SNE can hide differences in cluster spacing and density, and how geometry-based distortion cues reveal the structure behind a projection."
relatedResearch:
  - "visual-analytics"
  - "explainable-ai"
relatedProjects:
  - "dimensionality-reduction-distortion-cues"
relatedPublications:
  - "enriching-dimensionality-reduction-distortion-cues"
relatedPosts:
  - "interpreting-dimensionality-reduction-layouts"
---

Suppose I show you four t-SNE plots. Each contains four clean, well-separated clusters. The clusters have similar shapes, similar spacing, and even similar orientations.

Would you conclude that the four source datasets have roughly the same structure?

That conclusion would be understandable—and wrong.

In a controlled experiment from our paper, *Enriching Dimensionality Reduction with Distortion Cues*, four deliberately different three-dimensional datasets collapse into remarkably similar t-SNE layouts. Some source clusters are equally dense; others are not. Some cluster centers are equally spaced; others are not. The ordinary projections conceal both kinds of difference.

This experiment captures a central risk of dimensionality reduction: a projection can be visually coherent without being geometrically faithful.

## The experiment: change the data, hold the visual story

We created four synthetic datasets, D1 through D4. Each dataset contains four clusters, represented by points sampled uniformly inside cubes in three-dimensional space. Every cube contains 300 points, so each dataset has 1,200 points.

Two properties change across the four conditions:

- **Inter-cluster distance:** Are the cube centers equally spaced, or are some clusters farther apart than others?
- **Intra-cluster density:** Are the cubes the same size, or do different cube volumes make some clusters denser than others?

That gives a simple two-by-two design:

| Dataset | Cluster sizes and densities | Distances between cluster centers |
| --- | --- | --- |
| D1 | Same | Same |
| D2 | Same | Different |
| D3 | Different | Same |
| D4 | Different | Different |

D1 is the symmetric control. D2 changes only spacing. D3 changes only density. D4 changes both.

Before projection, these are genuinely different geometric situations. If a 2D view is used to compare cluster density or spacing, it should help an analyst distinguish them.

## What t-SNE shows—and what it hides

Now compare the source geometries in the first row below with the t-SNE projections in the second row.

<figure class="blog-figure blog-figure--wide">
  <img src="/images/blog/fig2-ground-truth-tsne.webp" alt="The D1 through D4 synthetic datasets in 3D above four visually similar t-SNE projections" width="1350" height="610" loading="lazy" />
  <figcaption><strong>Different source geometries, similar projections.</strong> D1-D4 vary cluster spacing, density, or both, but their t-SNE layouts look remarkably alike. Cropped from the first two rows of Fig. 2 in Hassan et al. (2026).</figcaption>
</figure>

Despite the controlled changes in the original data, the four scatterplots repeat almost the same visual narrative: four compact clusters separated by comparable gaps.

Two important signals have disappeared.

First, **visual spacing no longer communicates the original spacing**. In D2, one cluster is farther from the other three in the source space. Yet the t-SNE plot does not make that relationship reliably visible.

Second, **visual density no longer communicates the original density**. In D3, cube sizes vary, so the source clusters have different densities. In the projection, they look much more comparable than they really are.

The issue is not that t-SNE failed to produce clusters. It produced them very effectively. The issue is that the success of that local visualization invites stronger conclusions than the geometric supports.

## Why this matters outside a synthetic example

Analysts rarely use a projection only to ask, “Are there some groups?” They also compare groups:

- Which clusters are most similar?
- Which group is isolated?
- Is one cluster more variable than another?
- Does a gap indicate meaningful separation?
- Are two nearby islands related?

Those questions depend on distance and density. Yet prior work cited in our paper has shown that t-SNE and UMAP can perform poorly for judgments about cluster distances and densities, even when they remain useful for finding local groups.

In real analysis, we do not have the convenient 3D views shown in the first row of the figure. The source space may have hundreds of dimensions. That makes the projection persuasive precisely when independent geometric evidence is hardest to inspect.

## Put original-space evidence back into the projection

Our approach does not attempt to “fix” t-SNE or replace it with a new dimensionality-reduction algorithm. Instead, it enriches the existing 2D layout with selected distances measured in the original space.

The method constructs a Delaunay triangulation over the projected points. For each triangulation edge, it measures the distance between the corresponding samples in the original high-dimensional space. Those edge values are interpolated across each triangle to produce a continuous visual field.

In the enriched layouts, darker regions represent shorter original-space distances and brighter regions represent longer ones. The color is therefore not another estimate of projection quality. It brings actual source-space distance measurements into the structures the analyst is already examining.

The enriched layouts in the first row below show the result.

<figure class="blog-figure blog-figure--wide">
  <img src="/images/blog/fig2-enrichment-matrices.webp" alt="Delaunay-enriched layouts for D1 through D4 above their corresponding pairwise-distance matrices" width="1350" height="690" loading="lazy" />
  <figcaption><strong>The hidden differences become visible.</strong> Delaunay-based cues expose spacing and density variation directly in the layouts; the pairwise-distance matrices provide the fuller geometric reference. Cropped from the final two rows of Fig. 2 in Hassan et al. (2026).</figcaption>
</figure>

- **D1 stays comparatively uniform.** Equal cluster spacing and equal density produce a symmetric reference pattern.
- **D2 develops a bright ridge.** The distant cluster becomes visibly distinct from the closer trio, while cluster interiors remain relatively homogeneous because density did not change.
- **D3 changes inside the clusters.** Brighter and darker interiors reveal density differences even though the cluster centers remain equidistant.
- **D4 combines both signals.** Inter-cluster ridges expose spacing differences, while heterogeneous interiors expose density differences.

The fourth row provides a fuller reference: pairwise-distance matrices containing all point-to-point distances. Their block patterns confirm the inter- and intra-cluster relationships revealed by the enriched layouts.

## Why not show only the distance matrix?

A distance matrix contains more complete pairwise information, but completeness is not the only design goal. An analyst must mentally translate matrix blocks back to clusters in the scatterplot. That translation becomes harder when labels are unavailable or clusters have complex shapes.

The enriched layout asks a more focused question: **when the 2D projection places these points next to one another, what do their original distances say?**

That focus is also a limitation. A Delaunay triangulation contains only a sparse subset of all pairwise relationships, biased toward neighbors in the projection. It is good at exposing suspicious proximity and local density variation. It may miss points that are close in the original space but mapped far apart in 2D because those points may never become Delaunay neighbors.

The method should therefore be read as a projection-aware diagnostic, not a complete reconstruction of high-dimensional geometry.

## The practical lesson

When a t-SNE or UMAP or any projection plot shows neat clusters, treat the shapes as hypotheses rather than measurements.

A disciplined analysis separates three questions:

1. **What does the projection display?** Record the visible groups and neighborhoods without assigning them more meaning than the layout provides.
2. **What does the original space support?** Check distances, densities, or neighborhood relations using quantities computed before projection.
3. **Where do the two disagree?** Make those disagreements visible close to the structures being interpreted.

The synthetic experiment is valuable because the ground truth is controlled. We know exactly what changed between D1 and D4. When t-SNE makes those conditions look alike, the ambiguity cannot be blamed on noisy labels or uncertain domain knowledge. It comes from the projection.

That does not make t-SNE useless. It clarifies its role. A projection is a powerful interface for exploration, but it is not a literal map of the data.

## Publication, code, and resources

Read the [published article in *Computers & Graphics*](https://doi.org/10.1016/j.cag.2026.104724). The [official research repository](https://github.com/giva-lab/dr_layout_enrichment_cues) contains the core Delaunay-based implementation, dataset resources or loading procedures, the main analysis notebook, a sensitivity and rank-shift notebook, and plotting utilities. The repository documentation also identifies a separate parameter-free script for reproducing Fig. 5.

## Conclusion

Four clean t-SNE plots can tell the same visual story even when the source datasets encode different spacing and density relationships. The right response is not to distrust every projection. It is to demand evidence for the particular relationship we want to interpret.

Distortion-aware enrichment makes some of that evidence visible at the moment of judgment. In this experiment, it turns four nearly identical projections back into four meaningfully different geometric stories.

## References

1. Hassan, W., Schlieder, A., Sadlo, F., & Nonato, L. G. (2026). “Enriching Dimensionality Reduction with Distortion Cues.” *Computers & Graphics*, 104724. <https://doi.org/10.1016/j.cag.2026.104724>
2. van der Maaten, L., & Hinton, G. (2008). “Visualizing Data using t-SNE.” *Journal of Machine Learning Research*, 9, 2579-2605.
3. Xia, J., Zhang, Y., Song, J., Chen, Y., Wang, Y., & Liu, S. (2021). “Revisiting Dimensionality Reduction Techniques for Visual Cluster Analysis: An Empirical Study.” *IEEE Transactions on Visualization and Computer Graphics*, 28(1), 529-539.
4. Nonato, L. G., & Aupetit, M. (2018). “Multidimensional Projection for Visual Analytics: Linking Techniques with Distortions, Tasks, and Layout Enrichment.” *IEEE Transactions on Visualization and Computer Graphics*, 25(8), 2650-2673.
