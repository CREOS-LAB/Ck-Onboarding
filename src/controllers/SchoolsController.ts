import { Service } from "typedi";
import "reflect-metadata"
import { SchoolsServices } from "../services/SchoolsServices";

@Service()
export class SchoolsController{
    constructor(private readonly schoolServices : SchoolsServices){}

    
}