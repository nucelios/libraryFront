import { apiURL } from "@/constants";
import axios from "axios";


const baseURL = axios.create({baseURL: apiURL});

export default baseURL