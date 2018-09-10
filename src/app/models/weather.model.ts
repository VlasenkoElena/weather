export class Weather {
        name: string;
        main: {
            temp: number,
            humidity: number
        };
        sys: {
            country: string
        };
        weather: [
            { icon: string}
        ];
        iconUrl: string;
        id: number;
    constructor(
          name: string,
          main: {
            temp: number,
            humidity: number
          },
          sys: {
            country: string
          },
          weather: [
            { icon: string}
          ],
          iconUrl: string,
          id: number) {
              this.name = name;
              this.main = main;
              this.sys = sys;
              this.weather = weather;
              this.iconUrl = iconUrl;
              this.id = id;
          }
}