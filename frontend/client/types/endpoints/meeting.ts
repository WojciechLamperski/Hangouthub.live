export type MeetingResponse = {
   'Meeting': {
      'ExternalMeetingId': 'string',
      'MediaPlacement': {
         'AudioFallbackUrl': 'string',
         'AudioHostUrl': 'string',
         'EventIngestionUrl': 'string',
         'ScreenDataUrl': 'string',
         'ScreenSharingUrl': 'string',
         'ScreenViewingUrl': 'string',
         'SignalingUrl': 'string',
         'TurnControlUrl': 'string'
      },
      'MediaRegion': 'string',
      'MeetingId': 'string'
   }
}