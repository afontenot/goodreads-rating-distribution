// ==UserScript==
// @name         Goodreads Bayesian Ratings
// @version      0.0.2
// @description  Use a bayesian estimate of Goodreads rating (with percentile)
// @author       Adam Fontenot (https://github.com/afontenot)
// @match        https://www.goodreads.com/book/show/*
// @grant        none
// ==/UserScript==

'use strict';

const pct = [
  3.152, 3.305, 3.374, 3.420, 3.456, 3.485, 3.509, 3.532, 3.551, 3.570,
  3.586, 3.601, 3.614, 3.627, 3.640, 3.651, 3.662, 3.672, 3.682, 3.691,
  3.700, 3.709, 3.718, 3.725, 3.733, 3.741, 3.750, 3.757, 3.763, 3.771,
  3.778, 3.785, 3.791, 3.799, 3.805, 3.811, 3.818, 3.823, 3.830, 3.835,
  3.841, 3.849, 3.853, 3.860, 3.864, 3.871, 3.880, 3.880, 3.889, 3.895,
  3.900, 3.907, 3.911, 3.919, 3.924, 3.930, 3.936, 3.942, 3.949, 3.955,
  3.960, 3.968, 3.974, 3.980, 3.987, 3.993, 4.000, 4.008, 4.014, 4.021,
  4.029, 4.036, 4.043, 4.050, 4.058, 4.065, 4.072, 4.080, 4.088, 4.097,
  4.105, 4.113, 4.122, 4.131, 4.140, 4.150, 4.160, 4.170, 4.182, 4.195,
  4.209, 4.223, 4.238, 4.254, 4.273, 4.295, 4.320, 4.354, 4.400, 4.492
];


function percentile(value) {
  for (let i = 0; i < 100; i++) {
		if (value <= pct[i]) {
      return i;
    }
  }
  return 100;
}

const ratingElement = document.querySelector(".RatingStatistics__rating");
const rating = Number(ratingElement.textContent.trim());
const votes = Number(document.querySelector('span[data-testid="ratingsCount"]').textContent.replace(/ratings|,/ig, "").trim());

// these values determined by analysis of a large Goodreads dataset
const fakeRating = 3.881;
const fakeVotes = 45.774;

const newRating = (fakeRating * fakeVotes + rating * votes) / (fakeVotes + votes);

// Only execute script after the page loads
// This fixes a bug where the text replacement is reverted after the page finishes loading
window.addEventListener('load', function() {
  ratingElement.textContent = newRating.toFixed(2);
  ratingElement.insertAdjacentText("afterend", " " + percentile(newRating) + "%  ");
}, false);
