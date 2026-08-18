---
title: "Quantification Beyond Classification: Estimating Class Prevalence Under Shift"
slug: "quantification-beyond-classification"
date: "2026-08-03"
status: "published"
category: "Machine Learning"
tags:
  - "Quantification"
  - "Distribution Shift"
  - "Class Prevalence"
  - "Model Evaluation"
summary: "An introduction to why estimating class proportions is different from predicting individual labels, especially when prevalence, score distributions, and test-set size change."
featuredImage:
  src: "/images/publications/billion-instances.webp"
  alt: "A high-speed stream of two data classes producing an estimated prevalence ring"
  width: 960
  height: 540
seo:
  title: "Quantification Beyond Classification | Waqar Hassan"
  description: "Learn why class-prevalence estimation requires different methods and evaluation protocols from ordinary classification under distribution shift."
relatedResearch:
  - "quantification"
relatedProjects:
  - "quantification-assessment"
relatedPublications:
  - "accurately-quantifying-billion-instances"
  - "importance-test-set-size-quantification"
  - "accurately-quantifying-score-variability"
relatedPosts: []
---

Classification predicts a label for each observation. Quantification estimates how common each class is in a sample. The two tasks may share a classifier, but they optimize different outcomes and behave differently when the data distribution changes.

Suppose an organization wants to estimate the proportion of positive opinions in a stream of messages. It may not need a perfectly labeled record for every message. It needs an accurate aggregate estimate. A classifier with strong individual accuracy can still produce a biased prevalence estimate if its false-positive and false-negative errors do not balance under the new class distribution.

## Why Classify and Count is biased

The simplest quantifier applies a classifier and counts its predicted labels. This method is usually called Classify and Count.

Imagine a classifier with a modest false-positive rate. When the positive class is rare, false positives may outnumber true positives, causing prevalence to be substantially overestimated. When prevalence changes again, the direction and magnitude of the error also change.

Quantification methods address this by adjusting counts, matching score distributions, modeling mixtures, or directly optimizing prevalence error. The appropriate strategy depends on which aspects of the data remain stable between training and deployment.

## Prior shift is part of the task

In ordinary supervised learning, training and test data are often assumed to follow the same distribution. Quantification explicitly considers settings where class prevalence changes. This is sometimes described as prior-probability shift.

If only the class priors change while class-conditional feature distributions remain stable, several corrections are possible. Real deployments are more difficult: features and classification scores may also change. A robust assessment should therefore distinguish prevalence shift from broader concept drift.

Score-based quantifiers are especially sensitive to changes in how positive and negative examples overlap in score space. A method calibrated on well-separated training scores can fail when deployment scores become less separable—even if its prevalence-correction logic is sound under the original assumptions.

## Test-set size changes the problem

Quantification estimates a property of a sample. The number of observations in that sample directly controls uncertainty.

With thousands of observations, score distributions and summary statistics can be estimated reliably. With ten observations, the available prevalence values are coarse and a few errors can dominate the result. Methods that perform well on large samples may not be the strongest choices for small samples.

Evaluation should therefore cover the sample sizes expected in practice. Reporting one convenient test-set size can hide important differences between methods.

## Evaluate quantifiers as quantifiers

Classification accuracy is not a sufficient metric. Quantification evaluation compares the estimated prevalence vector with the true prevalence vector using measures such as absolute error or squared error.

The experimental protocol matters just as much as the metric. Artificial-prevalence protocols create samples with controlled class proportions, enabling systematic evaluation across the full prevalence range. Natural-prevalence protocols preserve the distributions observed in real samples. Each reveals different behavior.

Artificial sampling is useful, but its results should not be interpreted as the frequency with which prevalence conditions occur in the real world. Averaging uniformly across artificial prevalence values can reward a method for scenarios that are rare in the target application.

## Accuracy and efficiency can coexist

Some applications quantify high-volume streams where an estimate must be updated continuously. Distribution-matching methods can be accurate but computationally costly. Efficient approaches based on compact statistics, such as sample means, show that prevalence estimation can scale to very large samples without abandoning competitive accuracy.

This efficiency matters because quantification is often repeated across time windows, regions, or subgroups. A method that processes one sample quickly may still face millions of repeated estimations in production.

## A better workflow

A practical quantification study should:

1. Define the aggregate decision that requires prevalence estimates.
2. Identify plausible forms of distribution shift.
3. Evaluate multiple test-set sizes.
4. Compare simple and specialized baselines.
5. Use quantification-specific error measures.
6. Report computational cost as well as accuracy.
7. Inspect performance across the prevalence range instead of only reporting an average.

Quantification is not classification followed by presentation. It is a distinct inference task with its own assumptions, methods, and evaluation risks. Recognizing that distinction produces estimates that are more reliable—and more useful for decisions about populations rather than individuals.

