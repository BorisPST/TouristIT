import { Reservation_PaymentType, Reservation_Source, Reservation_Status } from "./reservation.constants"

export class Reservation {    
    private _id: number
    private _renterName: string
	private _renterId: number
    private _startDate: Date
    private _endDate: Date
    private _bookingDate: Date
    private _guestName: string
    private _amount: number
    private _persons: string
    private _guestPhone: string
    private _guestEmail: string
    private _reservationSource: string
    private _vrboReservationId: string
    private _description: string
    private _paymentType: string
    private _status: string
	private _payout: number
	private _paymentsCompleted: boolean
	private _queryString: string

	constructor() {}

	public get id() {
		return this._id
	}

	public set id(value: number) {
		this._id = value
	}

	public get renterName() {
		return this._renterName
	}
	
	public set renterName(value: string) {
		this._renterName = value
	}

	public get renterId() {
		return this._renterId
	}
	
	public set renterId(value: number) {
		this._renterId = value
	}

	public get startDate() {
		return this._startDate
	}
	
	public set startDate(value: Date) {
		this._startDate = value
	}

	public get endDate() {
		return this._endDate
	}
	
	public set endDate(value: Date) {
		this._endDate = value
	}

	public get bookingDate() {
		return this._bookingDate
	}
	
	public set bookingDate(value: Date) {
		this._bookingDate = value
	}
	
	public get guestName() {
		return this._guestName
	}

	public set guestName(value: string) {
		this._guestName = value
	}

	public get amount() {
		return this._amount
	}
	
	public set amount(value: number) {
		this._amount = value
	}

	public get persons() {
		return this._persons
	}
	
	public set persons(value: string) {
		this._persons = value
	}

	public get guestPhone() {
		return this._guestPhone
	}
	
	public set guestPhone(value: string) {
		this._guestPhone = value
	}

	public get guestEmail() {
		return this._guestEmail
	}
	
	public set guestEmail(value: string) {
		this._guestEmail = value
	}

	public get reservationSource() {
		return this._reservationSource
	}
	
	public set reservationSource(value: string) {
		this._reservationSource = value
	}

	public get vrboReservationId() {
		return this._vrboReservationId
	}
	
	public set vrboReservationId(value: string) {
		this._vrboReservationId = value
	}

	public get description() {
		return this._description
	}
	
	public set description(value: string) {
		this._description = value
	}

	public get paymentType() {
		return this._paymentType
	}
	
	public set paymentType(value: string) {
		this._paymentType = value
	}

	public get status() {
		return this._status
	}

	public set status(value: string) {
		this._status = value
	}    

	public get payout() {
		return this._payout
	}

	public set payout(value: number) {
		this._payout = value
	}

	public get paymentsCompleted() {
		return this._paymentsCompleted
	}

	public set paymentsCompleted(value: boolean) {
		this._paymentsCompleted = value
	}

	public get queryString() {
		return this._queryString
	}

	public set queryString(value: string) {
		this._queryString = value
	}

	public paymentCompleted() {
		return this.payout / this.amount >= 0.95
	}

	public generateQueryString() {
		const result = 
			this.renterName +
			this.startDate.toString() +
			this.endDate.toString() +
			this.guestName +
			this.amount.toString() +
			this.persons.toString() +
			this.reservationSource +
			this.description +
			this.paymentType +
			this.status +
			this.payout.toString()
		this.queryString = result
	}

    static getDateInformation(date: Date): string[] {
        const yyyy = date.getFullYear().toString();
        let mm = (date.getMonth() + 1).toString(); // Months start at 0!
        let dd = date.getDate().toString();
    
        if (parseInt(dd) < 10) dd = '0' + dd;
        if (parseInt(mm) < 10) mm = '0' + mm;

        return [dd, mm, yyyy]
    }

    static parseReservation(data: JSON): Reservation {
		const reservation = data["reservation"]
       	const result = new Reservation()
        result.id = reservation["id"],
        result.renterName = reservation["renter"]["name"],
        result.renterId = reservation["renterId"],
        result.startDate = new Date(reservation["startDate"]),
        result.endDate = new Date(reservation["endDate"]),
        result.bookingDate = new Date(reservation["bookingDate"]),
        result.guestName = reservation["guestName"],
        result.amount = Number(reservation["amount"]),
        result.persons = reservation["persons"],
        result.guestPhone = reservation["guestPhone"],
        result.guestEmail = reservation["guestEmail"],
        result.reservationSource = reservation["source"],
        result.vrboReservationId = reservation["vrboReservationId"],
        result.description = reservation["description"],
        result.paymentType = reservation["paymentType"],
        result.status = reservation["status"]
		result.payout = Number(data["payout"])
		result.generateQueryString()
		return result
    }
}