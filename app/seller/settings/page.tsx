export default function SettingsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6 max-w-2xl">
        {/* Profile Info */}
        <div className="bg-muted rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Profile information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Shop name</label>
              <input
                type="text"
                defaultValue="Vintage Vibes"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Location</label>
              <input
                type="text"
                defaultValue="Nairobi, Kenya"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
              <textarea
                defaultValue="Handpicked vintage pieces and sustainable fashion"
                rows={3}
                className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-muted rounded-xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-4">Notifications</h3>
          <div className="space-y-3">
            {[
              { label: 'Order notifications', checked: true },
              { label: 'Message notifications', checked: true },
              { label: 'AI suggestions', checked: false },
              { label: 'Marketing emails', checked: false },
            ].map((notif, idx) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={notif.checked}
                  className="w-4 h-4"
                />
                <span className="text-sm font-medium text-foreground">{notif.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl p-6 border border-red-200">
          <h3 className="font-semibold text-red-900 mb-4">Danger zone</h3>
          <p className="text-sm text-red-800 mb-4">These actions are permanent and cannot be undone.</p>
          <button className="px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition-colors">
            Close this account
          </button>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            className="px-6 py-2 rounded-lg font-medium text-white transition-colors"
            style={{ backgroundColor: '#D85A30' }}
          >
            Save changes
          </button>
          <button className="px-6 py-2 rounded-lg font-medium border border-border text-foreground hover:bg-background transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
