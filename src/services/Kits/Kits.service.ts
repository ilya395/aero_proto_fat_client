import { IKit } from "../../store/models/kits.model";
import ListService from "../base/List/List.service";

class KitsService extends ListService<IKit> {}

export default KitsService;