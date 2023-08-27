export class Assignment {
  constructor(
    public lineId: string,
    public lineDisplayId: string,
    public tasks: {
      taskID: string;
      type: string;
    }[],
    public assignedDriverId?: string,
  ) {}
}
