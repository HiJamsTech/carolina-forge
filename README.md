# Carolina Forge Website

## Overview
This is a complete website for Carolina Forge - an industrial networking group for service providers in the Carolinas. The site includes a homepage and dedicated launch event registration page.

## Files Included
- `index.html` - Main homepage
- `launch-event.html` - Event registration page  
- `styles.css` - Complete styling
- `script.js` - Interactive functionality
- `README.md` - This file

## Features

### Homepage (`index.html`)
- Hero section with clear value proposition
- Problem/solution framework
- Champion Shield methodology explanation
- Testimonials from founding members
- Event preview and registration CTA
- Professional, modern design

### Launch Event Page (`launch-event.html`)
- Detailed event information and agenda
- Complete registration form with validation
- Who should attend / who shouldn't attend sections
- Event timeline and expectations
- Contact information and logistics

### Styling (`styles.css`)
- Professional brand colors (Orange #D97706 primary)
- Responsive design for mobile/tablet/desktop
- Modern gradient backgrounds
- Smooth animations and hover effects
- Clean typography using Inter font
- Card-based layout components

### Functionality (`script.js`)
- Form validation and error handling
- Smooth scrolling navigation
- Registration form submission
- Auto-save form data to localStorage
- Analytics tracking setup (Google Analytics/Facebook Pixel)
- Mobile-responsive navigation
- Scroll-based animations

## Setup Instructions

### 1. Upload to Cloudflare Pages
Since you mentioned using Cloudflare, here's how to deploy:

1. **Upload files** to your Cloudflare Pages project
2. **Set carolinaforge.org as the custom domain**
3. **Enable automatic deployments** from your git repository (optional)

### 2. Form Handling Setup
The registration form currently logs to console. You need to:

1. **Replace the form submission** in `script.js` with your actual backend
2. **Set up email notifications** when someone registers
3. **Connect to your CRM/spreadsheet** for lead management

**Example backend integration:**
```javascript
// Replace the setTimeout in handleRegistrationSubmit with:
fetch('/api/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
    if (result.success) {
        showSuccessMessage();
        clearSavedFormData();
    } else {
        showFormError(result.message || 'Registration failed. Please try again.');
    }
})
.catch(error => {
    showFormError('Network error. Please check your connection and try again.');
})
.finally(() => {
    submitButton.textContent = originalText;
    submitButton.disabled = false;
});
```

### 3. Analytics Setup (Optional)
Add your tracking codes to the `<head>` section:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>

<!-- Facebook Pixel -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'PIXEL_ID');
  fbq('track', 'PageView');
</script>
```

### 4. Email Integration
Set up automated emails for:
- **Registration confirmation** to attendees
- **New registration notification** to you
- **Event reminder** sequence

### 5. SEO Optimization
The site includes:
- Meta descriptions
- Open Graph tags for social sharing
- Semantic HTML structure
- Fast loading times

Consider adding:
- Google Business Profile
- Local SEO optimization
- Schema markup for events

## Customization

### Brand Colors
Primary colors are defined in CSS:
- **Orange**: #D97706 (primary brand color)
- **Dark Gray**: #1F2937 (headers, navigation)
- **Light Gray**: #F9FAFB (section backgrounds)

### Content Updates
Key content to customize:
- **Contact information** (email, phone, LinkedIn)
- **Event location** (currently shows "Charlotte - details upon RSVP")
- **Testimonials** (currently using placeholder text)
- **Henry's bio** on about section

### Form Fields
The registration form collects:
- Basic contact info (name, email, phone)
- Company and role
- Industry served (dropdown)
- Services provided (textarea)
- How they heard about you
- Current networking challenges
- Questions/comments
- Email updates opt-in

Add or remove fields in both `launch-event.html` and the validation in `script.js`.

## Launch Checklist

### Pre-Launch
- [ ] Upload all files to Cloudflare Pages
- [ ] Set custom domain (carolinaforge.org)
- [ ] Test form submission and validation
- [ ] Set up email notifications
- [ ] Add real testimonials and bio content
- [ ] Test on mobile devices
- [ ] Set up analytics tracking

### Post-Launch
- [ ] Monitor form submissions
- [ ] Track website traffic and conversions
- [ ] A/B testing subject lines and copy
- [ ] SEO optimization and Google indexing
- [ ] Social media promotion

## Support
The website is built with standard HTML, CSS, and JavaScript - no frameworks required. It should work on all modern browsers and devices.

For technical questions about deployment or customization, the code is well-commented and follows standard web development practices.

## Next Steps
1. **Deploy the site to carolinaforge.org**
2. **Test the registration form**
3. **Send your first batch of emails** with links to the launch event page
4. **Monitor registrations and optimize** based on traffic/conversion data

The site is designed to convert visitors into event registrations, then registrations into members. Focus on driving quality traffic through your personalized email outreach!