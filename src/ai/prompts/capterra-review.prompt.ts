export function buildCapterraReviewPrompt(productName: string): string {
  return `You are filling out a Capterra review form. Generate realistic, authentic-sounding responses for each field below. Return ONLY a JSON object where each key is the section name and nested keys are the field labels with your response values. Do not include any text outside the JSON.

Platform: Capterra
Product: ${productName}
Total sections: 6

---

## Section: My Experience
Description: Rate and review your experience with this product

### Field: "How would you rate the overall quality of this product?"
- Type: stars
- Required: true
- Rating: 1-5 stars (provide a number)

### Field: "Consider covering these topics to make your review more helpful:"
- Type: topic_chips
- Required: false
- Options: ["VALUE FOR MONEY","CUSTOMER SUPPORT","EASE OF USE","CHAT","BUGS AND ISSUES","FILE SHARING","MEETING"]
- (Select relevant topics as JSON array)

### Field: "Pros: What did you like most about ${productName}?"
- Type: text
- Required: true
- Hint: What stood out positively?
- Max characters: 1000

### Field: "Cons: What did you like least about ${productName}?"
- Type: text
- Required: true
- Hint: What could be improved?
- Max characters: 1000

### Field: "Describe your overall experience with ${productName}"
- Type: text
- Required: true
- Hint: Share your overall thoughts
- Max characters: 1000

### Field: "Give your review a title"
- Type: text
- Required: true
- Hint: A short headline for your review
- Max characters: 150

### Field: "First Name"
- Type: text
- Required: true

### Field: "Last Name"
- Type: text
- Required: true

---

## Section: My Usage
Description: Tell us about how you use this product

### Field: "How long have you used ${productName}?"
- Type: select
- Required: true
- Options: ["Free trial","Less than 6 months","6-12 months","1-2 years","2+ years"]

### Field: "How frequently do you use ${productName}?"
- Type: select
- Required: true
- Options: ["Daily","Weekly","Monthly"]

### Field: "In what capacity do you use ${productName}?"
- Type: multi_dropdown
- Required: true
- Options: ["Collaboration","Knowledge Management","Live Chat","Remote Support","Employee Engagement","Team Communication","Instant Messaging & Chat","Remote Work","File Sharing","Meeting","Digital Workplace","Productivity","Audio Conferencing","Community","Video Conferencing","Internal Communications","Unified Communications","Employee Communication Tools","Screen Sharing","Web Conferencing","Sales Enablement","Content Collaboration","Screen Recording","Customer Engagement","Sales Engagement Platform","Enterprise Search"]
- (Select multiple from the options above, return as JSON array)

### Field: "What is your role in using ${productName}?"
- Type: multi_select
- Required: true
- Options: ["I am a user","I am the administrator","I am on the team that set up, implemented, or customized this product","I helped select or purchase this product"]
- (Select multiple from the options above, return as JSON array)

---

## Section: Product Rating
Description: Rate specific aspects of this product

### Field: "Ease of Use"
- Type: stars
- Required: true
- Rating: 1-5 stars

### Field: "Features & Functionality"
- Type: stars
- Required: true
- Rating: 1-5 stars

### Field: "Customer Support"
- Type: stars
- Required: false
- Rating: 1-5 stars

### Field: "Value for Money"
- Type: stars
- Required: false
- Rating: 1-5 stars

### Field: "Ease of Deployment"
- Type: stars
- Required: false
- Rating: 1-5 stars

### Field: "Ease of Setup"
- Type: stars
- Required: false
- Rating: 1-5 stars

### Field: "How does the pricing for ${productName} compare to similar products?"
- Type: pricing_scale
- Required: false
- Options: ["$","$$","$$$","$$$$","$$$$$"]
- Scale labels: {"0":"Inexpensive","4":"Expensive"}

### Field: "How likely is it that you would recommend ${productName} to a friend or colleague?"
- Type: nps_scale
- Required: true
- Scale: 0 to 10
- Scale labels: {"0":"Not Likely","10":"Very Likely"}

---

## Section: Feature Rating
Description: Rate the features you use — rate at least 5 features

### Field: "Please rate the following features"
- Type: feature_table
- Required: true
- Hint: Rate at least 5 features from 1-5 stars.
- Features: ["Alerts/Notifications","Content Management","Activity Tracking","Tagging","Reporting & Statistics","Drag & Drop","Collaboration Tools","Full Text Search","Third-Party Integrations","Surveys & Feedback","Communication Management","Calendar Management","Text Editing","AI Copilot","Single Sign On","Knowledge Base Management","Live Chat","Document Management","Widgets","SSL Security"]
- Response format: { "FeatureName": 4 }

---

## Section: Setup
Description: Switching, alternatives, integrations, costs, and implementation details

### Field: "Did you switch from another product?"
- Type: radio
- Required: true
- Options: ["Yes","No","I don't know"]

### Field: "What products did you switch from?"
- Type: text
- Required: true
- Max characters: 500
- Conditional: Only fill this if "Did you switch" is "Yes"

### Field: "Why did you make the switch?"
- Type: text
- Required: true
- Max characters: 500
- Conditional: Only fill this if "Did you switch" is "Yes"

### Field: "Did you consider other alternatives besides ${productName}?"
- Type: radio
- Required: false
- Options: ["Yes","No","I don't know"]

### Field: "While purchasing ${productName}, what alternative products were considered?"
- Type: text
- Required: true
- Max characters: 500
- Conditional: Only fill this if "Did you consider alternatives" is "Yes"

### Field: "Why did you choose ${productName} over these alternative products?"
- Type: text
- Required: true
- Max characters: 500
- Conditional: Only fill this if "Did you consider alternatives" is "Yes"

### Field: "Did you integrate any other products with ${productName}?"
- Type: radio
- Required: false
- Options: ["Yes","No","I don't know"]

### Field: "What products did you integrate with?"
- Type: integration_rating
- Required: false
- Options: ["SatisMeter","smartQ","BugSnag","Lattice","Freshservice","ITM Platform","HubSpot Marketing Hub","PractiTest","ClearSlide","AzureDesk","Groove","Nagios XI","GitHub","Talkdesk","Microsoft Outlook","PayPal","Todoist","Aircall","Chartbeat","Dropbox Business","Ortto","Webex Suite","Azuqua","UpRaise","TimeCamp","Lessonly","Jira","Google Drive","Trello","Asana","Zoom","Salesforce","HubSpot","Zapier","Crashlytics"]
- Response format: { "IntegrationName": { "selected": true, "rating": 4 } }
- Conditional: Only fill this if "Did you integrate" is "Yes"

### Field: "What was the initial cost for setting up ${productName}?"
- Type: select
- Required: false
- Options: ["I don't know / can't disclose","$0-$499","$500-$999","$1,000-$4,999","$5,000-$9,999","$10,000-$24,999","$25,000-$49,999"]

### Field: "What is the annual licensing cost for ${productName}?"
- Type: select
- Required: false
- Options: ["I don't know / can't disclose","$0-$499","$500-$999","$1,000-$4,999","$5,000-$9,999","$10,000-$24,999","$25,000-$49,999"]

### Field: "What percentage of discount did you receive while purchasing ${productName}?"
- Type: select
- Required: false
- Options: ["None","1-10%","11-20%","21-30%","31-40%","41-50%","51-60%","61-70%","71-80%","81-90%","90+%"]

### Field: "Who did you work with to implement ${productName}?"
- Type: select
- Required: false
- Options: ["Internal Team","${productName} (Software Vendor)","3rd Party Service Providers","I don't Know"]

---

## Section: Work Information
Description: Tell us about your company and role

### Field: "Company Name"
- Type: text
- Required: true

### Field: "Company Size"
- Type: select
- Required: true
- Options: ["Myself Only","2-10 employees","11-50 employees","51-200 employees","201-500 employees","501-1000 employees","1001-5000 employees","5001-10,000 employees","10,001+ employees"]

### Field: "Industry"
- Type: select
- Required: true
- Options: ["Accounting","Airlines/Aviation","Alternative Dispute Resolution","Alternative Medicine","Animation","Apparel & Fashion","Architecture & Planning","Arts & Crafts","Automotive","Banking","Biotechnology","Broadcast Media","Building Materials","Business Supplies & Equipment","Capital Markets","Chemicals","Civil Engineering","Computer & Network Security","Computer Games","Computer Hardware","Computer Networking","Computer Software","Construction","Consumer Electronics","Consumer Goods","Consumer Services","Cosmetics","Defense & Space","Design","E-Learning","Education Management","Electrical/Electronic Manufacturing","Entertainment","Environmental Services","Events Services","Financial Services","Food & Beverages","Food Production","Government Administration","Graphic Design","Health, Wellness & Fitness","Healthcare","Higher Education","Hospital & Health Care","Hospitality","Human Resources","Import & Export","Individual & Family Services","Industrial Automation","Information Services","Information Technology & Services","Insurance","International Trade & Development","Internet","Investment Management","Legal Services","Leisure, Travel & Tourism","Logistics & Supply Chain","Management Consulting","Manufacturing","Marketing & Advertising","Mechanical or Industrial Engineering","Media Production","Medical Devices","Mining & Metals","Music","Non-Profit Organization Management","Oil & Energy","Online Media","Outsourcing/Offshoring","Pharmaceuticals","Photography","Plastics","Primary/Secondary Education","Printing","Professional Training & Coaching","Publishing","Real Estate","Recreational Facilities & Services","Religious Institutions","Research","Restaurants","Retail","Security & Investigations","Semiconductors","Sporting Goods","Sports","Staffing & Recruiting","Telecommunications","Textiles","Translation & Localization","Transportation/Trucking/Railroad","Utilities","Venture Capital & Private Equity","Veterinary","Warehousing","Wholesale","Wine & Spirits","Writing & Editing","Other"]

### Field: "Job Function"
- Type: select
- Required: true
- Options: ["Administrative","Construction","Consulting","Creative & Design","Customer Services & Support","Education & Learning","Engineering","Entrepreneurs/Owners","Facilities & Maintenance","Finance & Accounting","Health & Medical","Human Resources","IT & Software Development","Legal","Logistics & Supply Chain","Marketing","Military & Protective Services","Procurement","Product","Program & Project Management","Real Estate","Research & Development","Sales & Business Development","Strategy & Operations","Other"]

### Field: "Job Title"
- Type: text
- Required: true

### Field: "Select the country where you are located"
- Type: select
- Required: true
- Options: ["United States","United Kingdom","Canada","Australia","India","Germany","France","Brazil","Japan","South Korea","Mexico","Netherlands","Spain","Italy","Sweden","Switzerland","Singapore","Israel","United Arab Emirates","South Africa","Nigeria","Argentina","Colombia","Philippines","Indonesia","Poland","Ireland","New Zealand","Belgium","Norway","Denmark","Finland","Portugal","Austria","Czech Republic","Romania","Thailand","Vietnam","Malaysia","Pakistan","Egypt","Kenya","Chile","Peru","Other"]

### Field: "Review Preview & Certification"
- Type: review_preview
- Required: true
- Review preview field (provide "confirmed")

---

Return a JSON object with the following structure:
{
  "sectionName": {
    "fieldLabel": "your response value"
  }
}

Make the responses sound natural, specific, and authentic. Vary ratings realistically (not all perfect scores). For text fields, write detailed but concise responses.`;
}
