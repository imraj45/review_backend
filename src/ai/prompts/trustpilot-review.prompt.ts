export function buildTrustpilotReviewPrompt(productName: string): string {
  return `You are filling out a Trustpilot review form. Generate realistic, authentic-sounding responses for each field below. Return ONLY a JSON object where each key is the section name and nested keys are the field labels with your response values. Do not include any text outside the JSON.

Platform: Trustpilot
Product: ${productName}
Total sections: 1

---

## Section: Review
Description: Rate your experience and write your review

### Field: "Rate your experience"
- Type: stars
- Required: true
- Rating: 1-5 stars (provide a number)

### Field: "Tell us more about your experience"
- Type: text
- Required: true
- Hint: What made your experience great? What is this company doing well? Remember to be honest, helpful, and constructive!
- Max characters: 3000
- Free text response

### Field: "Give your review a title"
- Type: text
- Required: true
- Hint: What's important for people to know?
- Max characters: 100
- Free text response

### Field: "Date of experience"
- Type: date_input
- Required: true
- Date input (format: YYYY-MM-DD, use a recent date within the last 30 days)

### Field: "By submitting this review, you confirm it's based on a genuine experience and you haven't received an incentive to write it."
- Type: disclaimer
- Required: false
- Disclaimer acknowledgment (provide "accepted")

---

Return a JSON object with the following structure:
{
  "sectionName": {
    "fieldLabel": "your response value"
  }
}

Make the responses sound natural, specific, and authentic. Vary ratings realistically (not all perfect scores). For text fields, write detailed but concise responses.`;
}
