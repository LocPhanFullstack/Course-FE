declare global {
  interface PaymentMethod {
    methodId: string;
    type: string;
    lastFour: string;
    expiry: string;
  }

  interface UserSetting {
    theme?: "light" | "dark";
    emailAlert?: boolean;
    smsAlert?: boolean;
    courseNotifications?: boolean;
    notificationFrequency?: boolean;
  }

  interface User {
    userId: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email: string;
    publicMetadata: {
      userType: "teacher" | "student";
    };
    privateMetadata: {
      settings?: UserSetting;
      paymentMethods?: Array<PaymentMethod>;
      defaultPaymentMethodId?: string;
      stripeCustomerId?: string;
    };
    unsafeMetadata: {
      bio?: string;
      urls?: string[];
    };
  }

  interface Course {
    courseId: string;
    teacherId: string;
    teacherName: string;
    title: string;
    description?: string;
    category: string;
    image?: string;
    price?: string;
    level: "Beginer" | "Intermediate" | "Advanced";
    status: "Draft" | "Published";
    sections: Section[];
    enrollment?: Array<{ userId: string }>;
  }

  interface Transaction {
    userId: string;
    transactionId: string;
    dateTime: string;
    courseId: string;
    paymentProvider: "stripe";
    paymentMethodId?: string;
    amount: number;
    savePaymentMethod?: boolean;
  }

  interface DateRange {
    from: string | undefined;
    to: string | undefined;
  }

  interface UserCourseProgress {
    userId: string;
    courseId: string;
    enrollmentDate: string;
    overallProgress: number;
    sections: SectionProgress[];
    lastAccessedTimestamp: string;
  }

  type CreateUserArgs = Omit<User, "userId">;
  type CreateCourseArgs = Omit<Course, "courseId">;
  type CreateTransactionArgs = Omit<Transaction, "transactionId">;

  interface Comment {
    commentId: string;
    userId: string;
    text: string;
    timestamp: string;
  }

  interface Chapter {
    chapterId: string;
    title: string;
    content: string;
    video?: string | File;
    freePreview?: boolean;
    type: "Text" | "Quiz" | "Video";
  }
}
