declare global {
  export interface IPaymentMethod {
    methodId: string
    type: string
    lastFour: string
    expiry: string
  }

  export interface IUserSettings {
    theme?: 'light' | 'dark'
    emailAlerts?: boolean
    smsAlerts?: boolean
    courseNotifications?: boolean
    notificationFrequency?: 'immediate' | 'daily' | 'weekly'
  }

  export interface IUser {
    userId: string
    firstName?: string
    lastName?: string
    username?: string
    email: string
    publicMetadata: {
      userType: 'teacher' | 'student'
      settings?: IUserSettings
      paymentMethods?: Array<IPaymentMethod>
      defaultPaymentMethodId?: string
      stripeCustomerId?: string
    }
    unsafeMetadata: {
      bio?: string
      urls?: string[]
    }
  }

  export interface ICourse {
    courseId: string
    teacherId: string
    teacherName: string
    title: string
    description: string
    category: string
    image?: string
    price?: number
    level: 'Beginer' | 'Intermediate' | 'Advanced'
    status: 'Draft' | 'Published'
    sections: ISection[]
    enrollments?: Array<{ userId: string }>
  }

  export interface ITransaction {
    userId: string
    transactionId: string
    dateTime: string
    courseId: string
    paymentProvider: 'stripe'
    paymentMethodId?: string
    amount: number
    savePaymentMethod?: boolean
  }

  export interface IDateRange {
    from: string | undefined
    to: string | undefined
  }

  export interface IUserCourseProgress {
    userId: string
    courseId: string
    enrollmentDate: string
    overallProgress: number
    sections: ISectionProgress[]
    lastAccessedTimestamp: string
  }

  export type CreateUserArgs = Omit<IUser, 'userId'>
  export type CreateCourseArgs = Omit<ICourse, 'courseId'>
  export type CreateTransactionArgs = Omit<ITransaction, 'transactionId'>

  export interface IComment {
    commentId: string
    userId: string
    text: string
    timestamp: string
  }

  export interface IChapter {
    chapterId: string
    title: string
    content: string
    video?: string | File
    freePreview?: boolean
    type: 'Text' | 'Quiz' | 'Video'
  }

  export interface IChapterProgress {
    chapterId: string
    completed: boolean
  }

  export interface ISectionProgress {
    sectionId: string
    completed: boolean
  }

  export interface ISection {
    sectionId: string
    sectionTitle: string
    sectionDescription?: string
    chapters: IChapter[]
  }

  export interface Window {
    Clerk: any
  }
}

export {}
