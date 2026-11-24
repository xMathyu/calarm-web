/**
 * Calarmi on Google Play. While the app is in closed testing, people get in by
 * joining the testers' Google Group and then opting in on Play — with the same
 * Google account their phone's Play Store uses.
 */
export const PLAY_PACKAGE = 'com.mathyusolutions.calarmi';
export const PLAY_URL = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;
/** Opt-in page; it only opens the test to members of the group below. */
export const PLAY_TESTING_URL = `https://play.google.com/apps/testing/${PLAY_PACKAGE}`;
/** «Calarmi Testers»: anyone can join, and members can't see each other. */
export const TESTERS_GROUP_URL = 'https://groups.google.com/g/calarmi-testers';
