export interface GroupDetail {
    groupName: string;
    tripCost: number;
    members: {
        memberName: string;
        memberEmail: string;
        amountPaid: number;
        balanceAmount: number;
        owner: boolean;
        originalBalanceAmount: number;
    }[]
}