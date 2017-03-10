import RollingSpider from "rolling-spider";
import temporal from "temporal";

const UUID = '0e900f155f5c41f0af506ce672a41927';
let d = new RollingSpider(UUID);

d.connect(function () {
  d.setup(function () {
    d.flatTrim();
    d.startPing();
    d.flatTrim();
    console.log('Connected to drone', d.name);

    temporal.queue([
      {
        delay: 2000,
        task: function () {
          console.log('Getting ready for takeOff!');
          d.takeOff();
          d.flatTrim();
        }
      },
      {
        delay: 10000,
        task: function () {
          console.log('Landing time');
          d.land();
        }
      },
      {
        delay: 5000,
        task: function () {
          temporal.clear();
          process.exit(0);
        }
      }
    ]);
  });
});
