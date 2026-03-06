import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactFormSubmission {
    projectType: ProjectType;
    name: string;
    message: string;
    phone: string;
}
export interface Service {
    name: string;
    description: string;
}
export interface CompanyInfo {
    name: string;
    email: string;
    website: string;
    address: string;
    phone: string;
}
export enum ProjectType {
    commercial = "commercial",
    residential = "residential"
}
export interface backendInterface {
    getCompanyInfo(): Promise<CompanyInfo>;
    getContactFormSubmissions(): Promise<Array<ContactFormSubmission>>;
    getServices(): Promise<Array<Service>>;
    submitContactForm(name: string, phone: string, message: string, projectType: ProjectType): Promise<void>;
}
