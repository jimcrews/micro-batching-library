
export type Job = {
    name: string;
};

export interface JobRequest extends Request {
    job?: Job;
  }

export type ConfigOptions = {
    size: number
    frequencySeconds: number
    running: boolean
}