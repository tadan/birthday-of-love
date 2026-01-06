# RSVP Feature Design
**Date:** 2026-01-06
**Status:** Ready for Implementation

## Overview
Add RSVP functionality to the Birthday of Love wedding website. Users click an RSVP button to open a modal form, submit their response via email, and the system remembers their submission to prevent duplicate RSVPs.

## User Flow

### Initial State
- Main page displays "Click to RSVP" button in SaveTheDate section
- "Save the event in your calendar" link always visible below button

### Opening RSVP Form
- User clicks "Click to RSVP" button
- Full-screen modal/dialog opens with:
  - Hero image at top (same as main page)
  - Form on beige background (#F5EFE7)
  - Close (X) button in top-right corner
  - Scrollable content

### Form Interaction - Attending
1. **Default state:** "Yes, can't wait!" radio selected
2. **Visible fields:**
   - Name (text input, required)
   - Surname (text input, required)
   - Are you attending? (radio group)
   - Food preference (radio: Vegetarian, Pescatarian, No dietary restriction, Vegan)
   - Your address (text input with placeholder)
   - Will you bring a guest? (textarea with helper text)
   - Anything else we should know? (textarea)
   - Submit button (orange #D64933, full width)

3. **On Submit:**
   - Send email to wedding@daniele.is via Formspree
   - Set localStorage flag: `birthday-of-love-rsvp-submitted = true`
   - Replace form with success message:
     - Hero image at top
     - "We can't wait to see you!"
     - "Keep an eye out for an invite in the snail mail!"
     - Contact info with email link
   - User can close modal

### Form Interaction - Not Attending
1. User selects "Sorry, can't make it." radio
2. **Fields hidden:**
   - Food preference
   - Your address
   - Will you bring a guest?
   - Anything else we should know?

3. **Still visible:**
   - Name (required)
   - Surname (required)
   - Radio buttons
   - Submit button

4. **On Submit:**
   - Send email to wedding@daniele.is via Formspree
   - Set localStorage flag: `birthday-of-love-rsvp-submitted = true`
   - Replace form with regret message:
     - Hero image at top
     - "We're sorry not to celebrate with you."
     - "If you change your mind please let us know. We hope to see you in 2026."
     - Contact info with email link
   - User can close modal

### Post-Submission State
- Main page checks localStorage for `birthday-of-love-rsvp-submitted`
- If flag exists: Hide "Click to RSVP" button
- Calendar link remains visible
- User can still access other parts of the site normally

## Component Architecture

### New Components

**1. `RSVPButton.tsx`**
- Rendered in SaveTheDate section
- Checks localStorage on mount
- Conditionally renders based on submission status
- Opens RSVPDialog on click

**2. `RSVPDialog.tsx`**
- Full-screen modal using shadcn Dialog component
- Contains hero image
- Manages open/closed state
- Handles form submission success state
- Shows either form or success message

**3. `RSVPForm.tsx`**
- Form built with react-hook-form
- Manages conditional field visibility
- Validates required fields
- Submits to Formspree endpoint
- Returns success/error state to parent

### Modified Components

**`SaveTheDate.tsx`**
- Import and render RSVPButton
- Keep existing calendar link

**`App.tsx`**
- No changes needed (RSVPDialog rendered within SaveTheDate)

## Technical Implementation

### Form State Management
```typescript
interface RSVPFormData {
  name: string;
  surname: string;
  isAttending: boolean; // true = "Yes, can't wait!", false = "Sorry, can't make it"
  foodPreference?: string;
  address?: string;
  guests?: string;
  notes?: string;
}
```

### Email Format
```
To: wedding@daniele.is
Subject: RSVP - [Name] [Surname] - [Attending/Not Attending]

Attending: [Yes/No]

Name: [Name]
Surname: [Surname]

[If attending:]
Food preference: [selection]
Address: [address]
Will bring guests: [guest info]
Additional notes: [notes]

[If not attending:]
(Sent regrets)
```

### Formspree Setup
1. Create free account at formspree.io
2. Create new form endpoint
3. Configure endpoint to forward to wedding@daniele.is
4. Use endpoint URL in RSVPForm submission
5. Formspree handles spam protection and delivery

### localStorage Management
- **Key:** `birthday-of-love-rsvp-submitted`
- **Value:** `"true"` (string)
- **Set:** After successful email submission
- **Check:** On SaveTheDate component mount
- **Clear:** User can manually clear via browser dev tools if they need to resubmit

## Design Specifications

### Colors
- Background (beige): `#F5EFE7`
- Primary button (orange): `#D64933`
- Text heading (red-orange): `#D64933`
- Body text: Dark gray/black (existing)

### Typography
- Heading "You're invited!": Large serif font (match existing hero style)
- Form labels: Sans-serif, medium weight
- Field text: Same as labels but lighter
- Helper text: Smaller, gray

### Spacing
- Modal padding: 24px mobile, 40px desktop
- Form fields: 20px gap between each
- Submit button: 16px top margin

### Mobile Responsive
- Full-screen modal on all devices
- Single column layout
- Hero image scales down on mobile
- Form fields stack vertically
- Submit button full width

## Validation Rules

### Required Fields (Attending)
- Name
- Surname
- Food preference

### Required Fields (Not Attending)
- Name
- Surname

### Optional Fields
- Address
- Guests
- Notes

## Error Handling

### Form Validation Errors
- Show inline error messages below fields
- Highlight required fields in red if empty on submit attempt
- Prevent submission until required fields are filled

### Email Submission Errors
- If Formspree fails: Show error message "Unable to submit RSVP. Please email us directly at wedding@daniele.is"
- Don't set localStorage flag if submission fails
- Allow user to retry or close modal

### Success Handling
- Only set localStorage after confirmed successful submission
- Show success message immediately after email sent
- User can close modal and continue browsing

## Future Enhancements (Not in Scope)
- Admin dashboard to view submissions
- Edit/update RSVP functionality
- Automatic reminder emails
- Guest list management

## Dependencies
- Existing: react-hook-form, @radix-ui/react-dialog, @radix-ui/react-radio-group, @radix-ui/react-label
- New: Formspree account (free tier)

## Testing Checklist
- [ ] RSVP button appears on initial load
- [ ] Modal opens when button clicked
- [ ] Form defaults to "Yes, can't wait!" selected
- [ ] All fields visible when attending
- [ ] Fields hide/show when toggling radio buttons
- [ ] Form validation works (required fields)
- [ ] Email sends successfully (attending)
- [ ] Email sends successfully (not attending)
- [ ] Success message appears after submission
- [ ] localStorage flag is set after submission
- [ ] RSVP button hidden after submission (refresh page to verify)
- [ ] Calendar link remains visible after submission
- [ ] Modal closes via X button
- [ ] Responsive on mobile devices
- [ ] Matches design screenshots exactly
