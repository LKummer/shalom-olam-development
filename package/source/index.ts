//import {$} from "/package/node_modules/jquery/src/jquery.js";
import {initialize_header_popups, to_paragraph, to_toc} from "./header-popup.ts";
import * as $ from "jquery";
import * as fuse from "fuse.js";

$('.hello').html("Hello World!");
initialize_header_popups();