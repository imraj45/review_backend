export function buildG2ReviewPrompt(productName: string): string {
  return `You are filling out a G2 review form. Generate realistic, authentic-sounding responses for each field below. Return ONLY a JSON object where each key is the section name and nested keys are the field labels with your response values. Do not include any text outside the JSON.

Platform: G2
Product: ${productName}
Total sections: 14

---

## Section: Recommendation Score
Description: How likely is it that you would recommend ${productName} to a friend or colleague?

### Field: "How likely is it that you would recommend ${productName} to a friend or colleague?"
- Type: nps_scale
- Required: true
- Scale: 0 to 10
- Scale labels: {"0":"Not likely","5":"Neutral","10":"Very likely"}

---

## Section: What You Like Best
Description: Tell G2 what you like best about ${productName}

### Field: "What do you like best about ${productName}?"
- Type: text
- Required: true
- Hint: Min 40 words required by G2
- Max characters: 1000
- Free text response

---

## Section: What You Dislike
Description: Tell G2 what you dislike about ${productName}

### Field: "What do you dislike about ${productName}?"
- Type: text
- Required: true
- Hint: Min 40 words required by G2
- Max characters: 1000
- Free text response

---

## Section: Problems Solved
Description: What problems is ${productName} solving and how is that benefiting you?

### Field: "What problems is ${productName} solving and how is that benefiting you?"
- Type: text
- Required: true
- Hint: Min 40 words required by G2
- Max characters: 1000
- Free text response

---

## Section: Purpose of Use
Description: Select the primary purposes you use ${productName} for

### Field: "For which purposes do you use ${productName}?"
- Type: multi_dropdown
- Required: true
- Hint: Select all that apply
- Options: ["Unified Workspaces","Project Management","Task Management","Workflow Management","Team Collaboration","Agile Development","Sprint Planning","Bug Tracking","Product Development","Operations Management","Resource Management","Time Tracking","Process Management","Documentation","Knowledge Management","Marketing Project Management","Content Management","Campaign Planning","Personal Productivity","Goal Tracking / OKRs","Client Management"]
- (Select multiple from the options above, return as JSON array)

---

## Section: Review Title
Description: Write a headline for your review

### Field: "Title for your review"
- Type: text
- Required: true
- Hint: Short headline summarizing your review
- Max characters: 150
- Free text response

---

## Section: Feature Review
Description: Select the features you commonly use and rate your satisfaction

### Field: "Which of these ${productName} features do you commonly use?"
- Type: feature_rating
- Required: true
- Hint: Select features, describe your experience, and rate satisfaction
- Features to rate (select features, give satisfaction 1-10, and a short description):
  - "Click Tracking": Tracks where users are clicking on a web page.
  - "Mouse Movement": Tracks mouse movement over a web page.
  - "Frustration Tracking": See where users experience the most difficulty on a web page.
  - "Error and Bug Tracking": Tracks sessions where users encountered errors and bugs.
  - "Split URL Testing": Split web traffic to a page between two different URLs.
  - "Data Analysis": Offers insights into relationships between user information and user behavior.
  - "Notes": Leave notes on sessions and bugs.
  - "User Identification": Collects user information (location, IP address, email, etc.).
  - "Search Box": Search sessions by keywords or IP address.
  - "Cross-system Integration": Works across multiple software systems or databases.
- Response format: { "FeatureName": { "selected": true, "satisfaction": 8, "text": "description" } }

---

## Section: Ratings & AI Trust
Description: Rate your experience and answer questions about AI trust and security

### Field: "Is ${productName} headed in the right direction?"
- Type: radio
- Required: true
- Options: ["Yes","No","I do not know"]

### Field: "Ease of Use"
- Type: rating_na
- Required: true
- Scale: 1 to 7 (or "N/A")
- Scale labels: {"1":"Least","7":"Most"}

### Field: "Meets Requirements"
- Type: rating_na
- Required: true
- Scale: 1 to 7 (or "N/A")

### Field: "Quality of Support"
- Type: rating_na
- Required: true
- Scale: 1 to 7 (or "N/A")

### Field: "Is the product or service expensive?"
- Type: rating_na
- Required: true
- Scale: 1 to 7 (or "N/A")

### Field: "How confident are you in the security features of ${productName}?"
- Type: rating_na
- Required: true
- Scale: 1 to 7 (or "N/A")

### Field: "When purchasing software for your business, how important is security to you?"
- Type: rating_na
- Required: true
- Scale: 1 to 7 (or "N/A")

---

## Section: About You
Description: Confirm your identity and current usage of ${productName}

### Field: "Are you a current user of ${productName}?"
- Type: radio
- Required: true
- Options: ["Yes","No"]

### Field: "Upload screenshot showing you logged into ${productName}"
- Type: screenshot_upload
- Required: true
- Hint: Skip — provide "done" or leave empty

---

## Section: Your Role & Alternatives
Description: Tell us about your usage type and whether you evaluated other products

### Field: "What is your primary role when using ${productName}?"
- Type: select
- Required: true
- Options: ["User","Administrator","Executive Sponsor","Consultant","Agency","Industry Analyst","Tech Writer"]

### Field: "Did you consider alternatives when choosing to purchase ${productName}?"
- Type: radio
- Required: true
- Options: ["Yes","No","I do not know"]

### Field: "What other products did you evaluate when considering ${productName}?"
- Type: text
- Required: false
- Max characters: 500
- Conditional: Only fill this if "Did you consider alternatives" is "Yes"

### Field: "Why did you choose ${productName} instead of the alternative(s)?"
- Type: text
- Required: false
- Max characters: 500
- Conditional: Only fill this if "Did you consider alternatives" is "Yes"

---

## Section: Your Details & Experience
Description: Organization size, job title, setup ratings, and usage frequency

### Field: "What was your organization size when working with ${productName}?"
- Type: select
- Required: true
- Options: ["Myself Only","2-10 employees","11-50 employees","51-200 employees","201-500 employees","501-1,000 employees","1,001-5,000 employees","5,001-10,000 employees","10,001+ employees"]

### Field: "Ease of Setup"
- Type: rating_na
- Required: true
- Scale: 1 to 7 (or "N/A")

### Field: "Ease of Admin"
- Type: rating_na
- Required: false
- Scale: 1 to 7 (or "N/A")

### Field: "Has ${productName} been a good partner in doing business?"
- Type: rating_na
- Required: false
- Scale: 1 to 7 (or "N/A")

### Field: "What is your level of experience with ${productName}?"
- Type: select
- Required: false
- Options: ["Trial/Evaluation Only","Still Implementing","Failed to go Live","Less than 1 Year","1-3 Years","3-5 Years",">5 years"]

### Field: "How frequently do you use ${productName}?"
- Type: select
- Required: false
- Options: ["Every day","At least once a week","At least once a month","A few times a year"]

### Field: "Are you willing to be a reference for this software product or service?"
- Type: radio
- Required: true
- Options: ["I agree","I decline"]

---

## Section: Switching Details
Description: Tell us if your organization switched to ${productName} from another vendor

### Field: "Did your organization switch to ${productName} from another vendor?"
- Type: radio
- Required: true
- Options: ["Yes","No","I don't know"]

### Field: "What did you switch from?"
- Type: text
- Required: true
- Max characters: 300
- Conditional: Only fill this if "Did your organization switch" is "Yes"

### Field: "Why did you switch? How does ${productName} compare to your previous system?"
- Type: text
- Required: true
- Max characters: 500
- Conditional: Only fill this if "Did your organization switch" is "Yes"

---

## Section: Integrations
Description: Tell us about the software you integrate with ${productName}

### Field: "Do you integrate ${productName} with any other software?"
- Type: radio
- Required: true
- Options: ["Yes","No","I don't know"]

### Field: "Which software have you integrated with ${productName}?"
- Type: multi_dropdown
- Required: false
- Options: ["Jira","Slack","Microsoft Teams","GitHub","GitLab","Google Drive","Google Calendar","Outlook","Zoom","Figma","HubSpot","Salesforce","Zapier","Webhook","Toggl","Harvest","Zendesk","Intercom","Dropbox","OneDrive","Other"]
- Conditional: Only fill this if "Do you integrate" is "Yes"

---

## Section: Your Organization
Description: Organization details, deployment, ROI, and AI usage

### Field: "At which organization did you most recently use ${productName}?"
- Type: text
- Required: true

### Field: "What was the URL of the organization where you most recently used ${productName}?"
- Type: searchable_select
- Required: false
- Options: ["https://clickup.com","https://google.com","https://microsoft.com","https://amazon.com","https://apple.com","https://meta.com","https://netflix.com","https://salesforce.com","https://hubspot.com","https://shopify.com","https://stripe.com","https://slack.com","https://atlassian.com","https://adobe.com","https://oracle.com","https://ibm.com","https://sap.com","https://zoom.us","https://notion.so","https://figma.com"]

### Field: "What is your industry when using ${productName}?"
- Type: searchable_select
- Required: true
- Options: ["Information Technology and Services","Computer Software","Internet","Marketing and Advertising","Financial Services","Banking","Insurance","Healthcare","Hospital & Health Care","Education Management","Higher Education","E-Learning","Retail","Consumer Goods","Automotive","Manufacturing","Construction","Real Estate","Telecommunications","Media & Entertainment","Government Administration","Non-Profit Organization Management","Legal Services","Accounting","Human Resources","Logistics & Supply Chain","Food & Beverages","Hospitality","Architecture & Planning","Design","Other"]

### Field: "How many people use ${productName} in your organization?"
- Type: searchable_select
- Required: false
- Options: ["1-4","5-9","10-24","25-49","50-99","100-249","250-499","500-999","1,000-2,499","2,500-4,999","5,000-9,999","10,000+"]

### Field: "What percent of your users have fully adopted ${productName}?"
- Type: searchable_select
- Required: false
- Options: ["0-10%","11-30%","31-50%","51-70%","71-90%","90-99%","100%"]

### Field: "How long did it take to go live?"
- Type: searchable_select
- Required: true
- Options: ["< 1 day","< 1 month","1-3 months","3-6 months","6-12 months",">12 months","Never","N/A"]

### Field: "Did you deploy in the cloud?"
- Type: radio
- Required: false
- Options: ["Yes","No"]

### Field: "What percent discount did you receive?"
- Type: searchable_select
- Required: false
- Options: ["0-10%","11-20%","21-30%","31-40%","41-50%","51-60%","61-70%","71-80%","81-90%","90%+"]

### Field: "What is your organization's estimated ROI on ${productName} (payback period in months)?"
- Type: searchable_select
- Required: true
- Options: ["6 months or less","7-12 months","13-24 months","24-36 months","37-48 months","48+ months","Never Got Full Payback","N/A"]

### Field: "What is the term of your contract?"
- Type: searchable_select
- Required: false
- Options: ["No Term","Month-to-month","1 Year","2 Years","3 Years","4+ Years"]

### Field: "How did you implement ${productName}?"
- Type: searchable_select
- Required: false
- Options: ["In-House Team","Vendor Services Team","3rd Party Consultant","Don't know"]

### Field: "Are you an employee, agent, or representative of ${productName}?"
- Type: radio
- Required: true
- Options: ["Yes","No"]

### Field: "Allow my review to show my name and face in the G2 community."
- Type: radio
- Required: false
- Options: ["I agree","I decline"]

### Field: "Have you used artificial intelligence (AI) features as part of ${productName}?"
- Type: radio
- Required: false
- Options: ["Yes","No","Not sure"]

### Field: "How often do you turn to this solution when facing your task at hand?"
- Type: searchable_select
- Required: false
- Options: ["Every time","Most of the time","Sometimes","Rarely","Never"]
- Conditional: Only fill this if "Have you used AI features" is "Yes"

### Field: "How has the ROI you've experienced from the AI features matched up against your expectations?"
- Type: searchable_select
- Required: false
- Options: ["Greatly fallen short of expectations","Fallen short of expectations","Met expectations","Exceeded expectations","Greatly exceeded expectations","Not sure"]
- Conditional: Only fill this if "Have you used AI features" is "Yes"

### Field: "Approximately how much of your time is saved by utilizing ${productName}'s AI features?"
- Type: searchable_select
- Required: false
- Options: ["None (0%)","1-5%","6-10%","11-25%","26-50%","More than 50%","Not sure"]
- Conditional: Only fill this if "Have you used AI features" is "Yes"

### Field: "Please describe the AI features of ${productName} and how you use them."
- Type: text
- Required: false
- Max characters: 1000
- Conditional: Only fill this if "Have you used AI features" is "Yes"

---

Return a JSON object with the following structure:
{
  "sectionName": {
    "fieldLabel": "your response value"
  }
}

Make the responses sound natural, specific, and authentic. Vary ratings realistically (not all perfect scores). For text fields, write detailed but concise responses that meet minimum word requirements.`;
}
