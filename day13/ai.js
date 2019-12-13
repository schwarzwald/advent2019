module.exports = (launcher, ball, ballMovement, paddle) => {
  if (ballMovement[1] == 1) {
    let offset = 19 - ball[1];
    let target = ball[0] + (offset * ballMovement[0]);

    if (paddle != target) {
      launcher.read(paddle < target ? 1 : -1);
    } else {
      launcher.read(0);
    }
  } else {
    launcher.read(ballMovement[0] || 0);
  }
}