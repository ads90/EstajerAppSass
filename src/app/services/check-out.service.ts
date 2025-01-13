import { Injectable } from '@angular/core';

@Injectable()
export class ChecksOutService {
    getChecksOutsData() {
        return [
          { id: '1',name: "Conference Room A", from: "2025-01-15T09:00:00", to: "2025-01-15T11:00:00", duration: 2, user: "Alice Johnson", status:'converted', items: ["bamboo-watch.jpg", "blue-t-shirt.jpg"]},
          { id: '2',name: "Meeting Room B", from: "2025-01-16T13:00:00", to: "2025-01-16T14:30:00", duration: 1.5, user: "Bob Smith", status:'converted'},
          { id: '3',name: "Board Room", from: "2025-01-17T10:00:00", to: "2025-01-17T12:00:00", duration: 2, user: "Charlie Brown", status:'converted'},
          { id: '4',name: "Training Room", from: "2025-01-18T15:00:00", to: "2025-01-18T16:00:00", duration: 1, user: "Diana Prince", status:'converted', items: ["bamboo-watch.jpg"]},
          { id: '5',name: "Webinar Room", from: "2025-01-19T11:00:00", to: "2025-01-19T12:30:00", duration: 1.5, user: "Emma Watson", status:'converted'},
          { id: '6',name: "Executive Lounge", from: "2025-01-20T08:00:00", to: "2025-01-20T09:30:00", duration: 1.5, user: "Frank Castle", status:'converted',  items: ["bamboo-watch.jpg", "blue-t-shirt.jpg", "bracelet.jpg"]},
          { id: '7',name: "Interview Room", from: "2025-01-21T14:00:00", to: "2025-01-21T15:00:00", duration: 1, user: "Gina Rodriguez", status:'converted' },
          { id: '8',name: "Workshop Space", from: "2025-01-22T09:00:00", to: "2025-01-22T12:00:00", duration: 3, user: "Harry Potter" , status:'converted'},
          { id: '9',name: "Presentation Room", from: "2025-01-23T12:00:00", to: "2025-01-23T13:00:00", duration: 1, user: "Isla Fisher", status:'converted' },
          { id: '10',name: "Event Hall", from: "2025-01-24T18:00:00", to: "2025-01-24T20:00:00", duration: 2, user: "Jack Black" , status:'converted' },
        ];
    }

    getChecksOutsWithItemsData() {
        return [
          {
            name: "Conference Room A",
            from: "2025-01-15T09:00:00",
            to: "2025-01-15T11:00:00",
            duration: 2,
            user: "Alice Johnson",
            items: ["image1.jpg", "image2.jpg"]
          },
          {
            name: "Meeting Room B",
            from: "2025-01-16T13:00:00",
            to: "2025-01-16T14:30:00",
            duration: 1.5,
            user: "Bob Smith",
            items: ["image3.jpg", "image4.jpg"]
          },
          {
            name: "Board Room",
            from: "2025-01-17T10:00:00",
            to: "2025-01-17T12:00:00",
            duration: 2,
            user: "Charlie Brown",
            items: ["image5.jpg", "image6.jpg"]
          },
          {
            name: "Training Room",
            from: "2025-01-18T15:00:00",
            to: "2025-01-18T16:00:00",
            duration: 1,
            user: "Diana Prince",
            items: ["image7.jpg", "image8.jpg"]
          },
          {
            name: "Webinar Room",
            from: "2025-01-19T11:00:00",
            to: "2025-01-19T12:30:00",
            duration: 1.5,
            user: "Emma Watson",
            items: ["image9.jpg", "image10.jpg"]
          },
          {
            name: "Executive Lounge",
            from: "2025-01-20T08:00:00",
            to: "2025-01-20T09:30:00",
            duration: 1.5,
            user: "Frank Castle",
            items: ["image11.jpg", "image12.jpg"]
          },
          {
            name: "Interview Room",
            from: "2025-01-21T14:00:00",
            to: "2025-01-21T15:00:00",
            duration: 1,
            user: "Gina Rodriguez",
            items: ["image13.jpg", "image14.jpg"]
          },
          {
            name: "Workshop Space",
            from: "2025-01-22T09:00:00",
            to: "2025-01-22T12:00:00",
            duration: 3,
            user: "Harry Potter",
            items: ["image15.jpg", "image16.jpg"]
          },
          {
            name: "Presentation Room",
            from: "2025-01-23T12:00:00",
            to: "2025-01-23T13:00:00",
            duration: 1,
            user: "Isla Fisher",
            items: ["image17.jpg", "image18.jpg"]
          },
          {
            name: "Event Hall",
            from: "2025-01-24T18:00:00",
            to: "2025-01-24T20:00:00",
            duration: 2,
            user: "Jack Black",
            items: ["image19.jpg", "image20.jpg"]
          },
        ];
    }

    getChecksOutsMini() {
        return Promise.resolve(this.getChecksOutsData().slice(0, 5));
    }

    getChecksOutsSmall() {
        return Promise.resolve(this.getChecksOutsData().slice(0, 10));
    }

    getChecksOuts() {
        return Promise.resolve(this.getChecksOutsData());
    }

    getChecksOutsWithItemsSmall() {
        return Promise.resolve(this.getChecksOutsWithItemsData().slice(0, 10));
    }

    getChecksOutsWithItems() {
        return Promise.resolve(this.getChecksOutsWithItemsData());
    }
};
