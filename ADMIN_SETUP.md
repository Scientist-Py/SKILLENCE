# Admin Panel Setup Guide

A comprehensive admin panel for managing student registrations with dashboard, submissions management, and analytics.

## Features

### 📊 Dashboard
- **Statistics Cards**: Total registrations, today's registrations, weekly and monthly stats
- **Quick Overview**: Key metrics at a glance
- **Recent Activity**: Latest submissions
- **Class Distribution**: Visual breakdown by class
- **Quick Actions**: Fast access to common tasks

### 📝 Submissions Management
- **View All Submissions**: Complete list of all student registrations
- **Search & Filter**: Search by name, phone, school, or class
- **Class Filter**: Filter submissions by class
- **Export Data**: Download submissions as CSV
- **View Details**: See full submission information
- **Delete**: Remove submissions (coming soon)

### 📈 Analytics
- **Registration Trends**: See registration patterns over time
- **Class Distribution**: Visual breakdown by class
- **Time-based Analysis**: Peak registration times
- **School Distribution**: Top schools by registrations

## Setup

### 1. Environment Variables

Add to your `.env` file:

```env
# Admin Panel
ADMIN_PASSWORD=your_secure_password_here

# Optional: For Google Sheets API integration
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SHEETS_API_KEY=your_api_key
```

### 2. Access Admin Panel

1. Navigate to `/admin/login` in your browser
2. Enter the admin password (set in `ADMIN_PASSWORD`)
3. You'll be redirected to the dashboard

**Default password**: `admin123` (if not set in .env)

⚠️ **Important**: Change the default password in production!

### 3. Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard (protected)
- `/admin/submissions` - View all submissions (protected)
- `/admin/analytics` - Analytics and insights (protected)

## Current Status

### ✅ Implemented
- Login page with password authentication
- Dashboard with statistics cards
- Submissions page with search and filters
- Analytics page structure
- Protected routes
- Responsive admin layout with sidebar
- Export to CSV functionality

### 🚧 Coming Soon
- Google Sheets API integration for real data
- Delete submissions functionality
- View submission details modal
- Charts and graphs for analytics
- Advanced filtering options
- Bulk operations

## Google Sheets API Integration

To connect real data from Google Sheets:

1. **Enable Google Sheets API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable Google Sheets API
   - Create credentials (API Key)

2. **Update Environment Variables**:
   ```env
   GOOGLE_SHEET_ID=your_spreadsheet_id
   GOOGLE_SHEETS_API_KEY=your_api_key
   ```

3. **Install Google Sheets API Package** (optional):
   ```bash
   pnpm add googleapis
   ```

4. **Update Server Routes**:
   - Edit `server/routes/admin.ts`
   - Implement Google Sheets API calls
   - Parse and return data

## Security Notes

- ⚠️ Currently uses simple password authentication
- ⚠️ For production, implement:
  - JWT tokens
  - Session management
  - Rate limiting
  - HTTPS only
  - Strong password requirements
  - Two-factor authentication (optional)

## Customization

### Change Admin Password

Update `.env`:
```env
ADMIN_PASSWORD=your_new_secure_password
```

### Change Dashboard Colors

Edit `client/pages/admin/Dashboard.tsx` and update the `statCards` color classes.

### Add New Stats

1. Update `server/routes/admin.ts` - `getDashboardStats` function
2. Add new stat card in `client/pages/admin/Dashboard.tsx`
3. Update the API response interface if needed

## Troubleshooting

### Can't login
- Check `ADMIN_PASSWORD` in `.env` file
- Restart your server after changing `.env`
- Check browser console for errors

### No data showing
- Google Sheets API integration is not yet implemented
- Data will show once API is connected
- Currently shows empty state with placeholders

### Protected route redirects to login
- Make sure you're logged in
- Check localStorage for `admin_authenticated` key
- Clear browser cache and try again

## Next Steps

1. ✅ Set up admin password in `.env`
2. ✅ Test login at `/admin/login`
3. 🚧 Connect Google Sheets API for real data
4. 🚧 Add charts library (recharts is already available)
5. 🚧 Implement delete functionality
6. 🚧 Add export to Excel option

## Support

For issues or questions, check:
- Server logs in terminal
- Browser console (F12)
- Google Apps Script execution logs

