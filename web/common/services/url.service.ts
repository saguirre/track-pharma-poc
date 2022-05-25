export interface IUrlService {
  getUrlFromCID: (tokenURI: string) => string;
}

export class UrlService {
  public getUrlFromCID = (tokenURI: string) => {
    const cid = tokenURI.split("//")[1];
    return `${process.env.NEXT_PUBLIC_IPFS_URL}${cid}`;
  };
}
