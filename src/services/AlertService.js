import { ALERT_TYPES, MESSAGES } from '../utils/constants';

class AlertService {
  constructor() {
    this.activeAlerts = [];
  }

  // Send assistance request (mock implementation for Phase 1)
  async sendAssistanceRequest(location, additionalNote = '') {
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const alert = {
        id: `alert_${Date.now()}`,
        type: ALERT_TYPES.ASSISTANCE,
        location: location,
        timestamp: new Date().toISOString(),
        status: 'active',
        additionalNote: additionalNote,
        recipientsCount: Math.floor(Math.random() * 6) + 3 // Random 3-8 users
      };
      
      this.activeAlerts.push(alert);
      
      // Return success message with recipient count
      return {
        success: true,
        message: MESSAGES.alertSent.replace('{count}', alert.recipientsCount),
        alert: alert
      };
    } catch (error) {
      console.error('Error sending assistance request:', error);
      return {
        success: false,
        message: 'Failed to send assistance request. Please try again.'
      };
    }
  }

  // Get active alerts
  getActiveAlerts() {
    return this.activeAlerts.filter(alert => alert.status === 'active');
  }

  // Resolve an alert
  resolveAlert(alertId) {
    const alertIndex = this.activeAlerts.findIndex(alert => alert.id === alertId);
    if (alertIndex !== -1) {
      this.activeAlerts[alertIndex].status = 'resolved';
      this.activeAlerts[alertIndex].resolvedAt = new Date().toISOString();
    }
  }

  // Get alert history
  getAlertHistory() {
    return this.activeAlerts;
  }

  // Clear old alerts (older than 30 minutes)
  clearOldAlerts() {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    this.activeAlerts = this.activeAlerts.filter(alert => 
      new Date(alert.timestamp) > thirtyMinutesAgo
    );
  }

  // Future method for emergency alerts (Phase 2)
  async sendEmergencyAlert(location, emergencyContacts = []) {
    // This will be implemented in Phase 2
    console.log('Emergency alert functionality will be implemented in Phase 2');
    return {
      success: false,
      message: 'Emergency alerts not yet implemented'
    };
  }
}

export default new AlertService(); 