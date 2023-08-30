enum Expense_Type {
    HOSPITALITY = "Hospitality",
    HOUSE = "House",
    POOL = "Pool",
    GRILL = "Grill",
    OTHER = "Other"
  }
  
  enum Reservation_Source {
    VRBO = "Vrbo",
    GOOGLE = "Google",
    REFERRAL = "Referral",
    DIRECT_CONTACT = "Direct Contact",
    OLD_GUEST = "Old Guest",
    OTHER = "Other"
  }
  
  enum Reservation_Status {
    IN_PROGRESS = "In Progress",
    BOOKED = "Booked",
    CANCELLED = "Cancelled"
  }

  enum Reservation_PaymentType {
    CASH = "Cash",
    BANK_TRANSFER = "Bank Transfer",
    PARTNER = "Partner"
  }

  export { Expense_Type, Reservation_Source, Reservation_Status, Reservation_PaymentType }