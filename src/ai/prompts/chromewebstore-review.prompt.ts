export function buildChromeWebStoreReviewPrompt(productName: string): string {
  return `You are filling out a Chrome Web Store review form. Generate realistic, authentic-sounding responses for each field below. Return ONLY a JSON object where each key is the section name and nested keys are the field labels with your response values. Do not include any text outside the JSON.

Platform: Chrome Web Store
Product: ${productName}
Total sections: 1

---

## Section: Review
Description: Pick a star rating and write your review

### Field: "Pick a star rating and write a review"
- Type: star_review_combo
- Required: true
- Hint: Pick a star rating and write a review
- Max characters: 2000
- Combined star rating (1-5) and text review
- Response format: { "rating": 4, "text": "your review text here" }

---

Return a JSON object with the following structure:
{
  "sectionName": {
    "fieldLabel": "your response value"
  }
}

Make the responses sound natural, specific, and authentic. Vary ratings realistically (not all perfect scores). For text fields, write detailed but concise responses.`;
}
