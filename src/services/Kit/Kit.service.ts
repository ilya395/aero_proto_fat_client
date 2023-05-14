import { DocumentData } from "firebase/firestore";
import { IKit } from "../../store/models/kits.model";
import { EModelKeys } from "../../types/enums/models.enum";
import BaseItemService from "../base/Item/Item.service";
import { firebaseInstance } from "../firebase/firebase.service";

class KitService {
  service: BaseItemService<IKit>;

  constructor() {
    this.service = new BaseItemService(firebaseInstance.getFirestore(), EModelKeys.Kits);

    this.getDocRef = this.getDocRef.bind(this);
    this.getOne = this.getOne.bind(this);
    this.createOne = this.createOne.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
  }

  getDocRef(id: string) {
    return this.service.getDocRef(id);
  }

  async getOne(id: string): Promise<IKit | DocumentData | undefined> {
    return this.service.getOne(id);
  }

  async createOne(arg: IKit): Promise<string> {
    return this.service.createOne(arg);
  }

  async updateOne(arg: IKit): Promise<IKit | DocumentData | undefined> {
    return this.service.updateOne(arg);
  }

  async deleteOne(id: string) {
    return this.service.deleteOne(id);
  }
}

export default KitService;