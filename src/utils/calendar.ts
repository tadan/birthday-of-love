// Generate and download .ics calendar file
export function downloadCalendarEvent() {
  const eventData = {
    title: 'Birthday of Love ❤️ Daniele + Begga',
    location: 'Agriturismo La Rustica, Abruzzo, Italy',
    description: 'Join us to celebrate our wedding and 40th birthday in the hills of Abruzzo. Child friendly event with plenty of food, music and dancing.',
    start: '20260829T150000Z', // August 29, 2026, 3:00 PM UTC
    end: '20260830T020000Z',   // August 30, 2026, 2:00 AM UTC
    url: 'https://maps.app.goo.gl/W7DsQzMamTA2Tbj56'
  };

  // Generate unique ID for the event
  const timestamp = new Date().getTime();
  const random = Math.random().toString(36).substring(2, 15);
  const eventId = `birthday-of-love-${timestamp}-${random}@wedding.com`;

  // Get current timestamp in iCalendar format
  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // Create .ics file content
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Birthday of Love//Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Birthday of Love',
    'X-WR-TIMEZONE:Europe/Rome',
    'BEGIN:VEVENT',
    `UID:${eventId}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${eventData.start}`,
    `DTEND:${eventData.end}`,
    `SUMMARY:${eventData.title}`,
    `DESCRIPTION:${eventData.description}`,
    `LOCATION:${eventData.location}`,
    `URL:${eventData.url}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P7D',
    'DESCRIPTION:Reminder: Birthday of Love - 1 week',
    'ACTION:DISPLAY',
    'END:VALARM',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'DESCRIPTION:Reminder: Birthday of Love - Tomorrow!',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  // Create blob and download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'birthday-of-love-wedding.ics';

  // Trigger download
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up
  window.URL.revokeObjectURL(link.href);
}
