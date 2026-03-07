import { Bell, Calendar, MessageSquare, UserPlus, AlertCircle, Check } from 'lucide-react';

interface Notification {
  id: number;
  type: 'appointment' | 'message' | 'user' | 'alert';
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

export default function CounselorNotifications() {
  const notifications: Notification[] = [
    { id: 1, type: 'appointment', title: 'New Appointment Request', description: 'John Doe requested an appointment for March 15 at 10:00 AM', time: '5 minutes ago', isRead: false },
    { id: 2, type: 'message', title: 'New Message', description: 'Jane Smith sent you a message', time: '1 hour ago', isRead: false },
    { id: 3, type: 'appointment', title: 'Appointment Reminder', description: 'You have an appointment with Mike Johnson in 30 minutes', time: '2 hours ago', isRead: true },
    { id: 4, type: 'user', title: 'New Student Assigned', description: 'Sarah Williams has been assigned to you', time: '3 hours ago', isRead: true },
    { id: 5, type: 'alert', title: 'Profile Update Required', description: 'Please update your availability schedule', time: '1 day ago', isRead: true },
    { id: 6, type: 'message', title: 'New Message', description: 'Tom Brown sent you a message', time: '1 day ago', isRead: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return <Calendar size={20} className="text-blue-600" />;
      case 'message': return <MessageSquare size={20} className="text-green-600" />;
      case 'user': return <UserPlus size={20} className="text-purple-600" />;
      case 'alert': return <AlertCircle size={20} className="text-yellow-600" />;
      default: return <Bell size={20} className="text-gray-600" />;
    }
  };

  const getBackgroundColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-gray-50';
    switch (type) {
      case 'appointment': return 'bg-blue-50';
      case 'message': return 'bg-green-50';
      case 'user': return 'bg-purple-50';
      case 'alert': return 'bg-yellow-50';
      default: return 'bg-white';
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Notifications</h1>
          <p className="text-gray-600">
            You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <button className="px-4 py-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium">
          Mark All as Read
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-6 ${getBackgroundColor(notification.type, notification.isRead)} hover:bg-gray-100 transition-colors cursor-pointer`}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 p-3 bg-white rounded-lg shadow-sm">
                {getIcon(notification.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {notification.title}
                  </h3>
                  {!notification.isRead && (
                    <div className="flex-shrink-0 h-2 w-2 bg-teal-500 rounded-full"></div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                <p className="text-xs text-gray-500">{notification.time}</p>
              </div>

              {!notification.isRead && (
                <button className="flex-shrink-0 p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Mark as read">
                  <Check size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Bell className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-600">No notifications yet</p>
        </div>
      )}
    </div>
  );
}
