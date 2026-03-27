export function buildProductHuntReviewPrompt(productName: string): string {
  return `You are filling out a Product Hunt review form. Generate realistic, authentic-sounding responses for each field below. Return ONLY a JSON object where each key is the section name and nested keys are the field labels with your response values. Do not include any text outside the JSON.

Platform: Product Hunt
Product: ${productName}
Total sections: 3

---

## Section: Review
Description: Rate and review this product

### Field: "How would you rate it overall?"
- Type: ph_rating
- Required: true
- Rating with descriptions (pick one number 1-5):
  1: Frustrating experience; do not use
  2: Below average; needs improvement
  3: Average; does the job
  4: Great product; recommend it
  5: Outstanding; must-have product

### Field: "Why is it fantastic?"
- Type: tag_textarea
- Required: true
- Hint: Tell us why this product is fantastic...
- Max characters: 2000
- Free text with tags. Write a detailed response.

### Field: "What else did you consider?"
- Type: tag_textarea
- Required: false
- Hint: Why did you choose this product over other alternatives?
- Max characters: 2000
- Free text with tags. Write a detailed response.

### Field: "What can be improved?"
- Type: tag_textarea
- Required: false
- Hint: Tell us what can be improved about this product...
- Max characters: 2000
- Free text with tags. Write a detailed response.

---

## Section: AI Questions
Description: These questions are what the community wants to know about this product. They are generated with AI based on reviews, comments, and forum threads.

### Field: "AI Questions"
- Type: ai_questions
- Required: false
- AI-generated community questions. Answer each briefly:
  - "Traceability: Can I map claims to sources within the editor?"
  - "Security & Privacy: What data is stored, and for how long?"
  - "Trust & Accuracy: Does it truly avoid hallucinations in generated posts?"
- Response format: { "question": "your answer" }

---

## Section: Ratings
Description: Rate different aspects of this product to help others understand your experience.

### Field: "Ratings"
- Type: ph_multi_rating
- Required: true
- Multiple rating questions (rate each 1-5):
  - "How easy is it to use?": 1=Unusable; extremely frustrating, 2=Difficult to navigate, 3=Average usability, 4=Intuitive and well-designed, 5=Effortless to navigate; a joy to use
  - "How customizable is it?": 1=No customization options, 2=Very limited customization, 3=Some customization available, 4=Full-featured and adaptable, 5=Endlessly customizable
  - "How reliable is it?": 1=Constantly crashes or fails, 2=Frequent issues and bugs, 3=Generally stable with occasional issues, 4=Very reliable; rarely has problems, 5=Rock-solid; never had a single issue
  - "How much value does it provide for the money/time invested?": 1=Not worth it at all, 2=Barely worth the cost or effort, 3=Fair value for the price, 4=Great value; exceeds expectations, 5=Incredible ROI; a must-have investment
- Response format: { "question": 4 }

---

Return a JSON object with the following structure:
{
  "sectionName": {
    "fieldLabel": "your response value"
  }
}

Make the responses sound natural, specific, and authentic. Vary ratings realistically (not all perfect scores). For text fields, write detailed but concise responses.`;
}
