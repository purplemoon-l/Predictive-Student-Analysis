import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger,
    animateChild
} from '@angular/animations';
export const CardAnimation1 = trigger('cardAnimation1', [
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(30%)', opacity: 0 }),
        animate('300ms 100ms ease-in-out')
    ])
]);
export const CardAnimation2 = trigger('cardAnimation2', [
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(30%)', opacity: 0 }),
        animate('300ms 200ms ease-in-out')
    ]),
    transition('* => void', [
        animate(400, style({ transform: 'translateY(50%)' }))
    ])
]);
export const CardAnimation3 = trigger('cardAnimation3', [
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(30%)', opacity: 0 }),
        animate('300ms 300ms ease-in-out')
    ]),
    transition('* => void', [
        animate(100, style({ transform: 'translateY(50%)' }))
    ])
]);
export const CardAnimation4 = trigger('cardAnimation4', [
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(30%)', opacity: 0 }),
        animate('300ms 400ms ease-in-out')
    ]),
    transition('* => void', [
        animate(400, style({ transform: 'translateY(50%)' }))
    ])
]);
export const CardAnimation5 = trigger('cardAnimation5', [
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(30%)', opacity: 0 }),
        animate('300ms 500ms ease-in-out')
    ]),
    transition('* => void', [
        animate(400, style({ transform: 'translateY(50%)' }))
    ])
]);
export const CardAnimation6 = trigger('cardAnimation6', [
    state('in', style({ transform: 'translateY(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateY(30%)', opacity: 0 }),
        animate('300ms 600ms ease-in-out')
    ]),
    transition('* => void', [
        animate(400, style({ transform: 'translateY(50%)' }))
    ])
]);
export const FadeIn = trigger('fadeIn', [
    state('in', style({ opacity: '1' })),
    transition('void => *', [
        style({ opacity: '0' }),
        animate('200ms ease-in-out')
    ]),
    transition('* => void', [
        animate(200, style({ opacity: '0' }))
    ])
]);
export const FadeIn1 = trigger('fadeIn1', [
    state('in', style({ opacity: '1' })),
    transition('void => *', [
        style({ opacity: '0' }),
        animate('200ms ease-in-out')
    ]),
    transition('* => void', [
        animate(200, style({ opacity: '0' }))
    ])
]);
export const FadeIn2 = trigger('fadeIn2', [
    state('in', style({ opacity: '1' })),
    transition('void => *', [
        style({ opacity: '0' }),
        animate('200ms 100ms ease-in-out')
    ]),
    transition('* => void', [
        animate(200, style({ opacity: '0' }))
    ])
]);

export const LoopAnimation = trigger('loopAnimation', [
    transition('* => *', [
        query('@cardAnimation1', [
            stagger(20, [
                animateChild()
            ])
        ], { optional: true })
    ])
]);

export const SlideInFromRight = trigger('slideInFromRight', [
    state('in', style({ transform: 'translateX(0)', opacity: 1 })),
    transition('void => *', [
        style({ transform: 'translateX(30%)', opacity: 0 }),
        animate('250ms ease-in-out')
    ]),
    transition('* => void', [
        animate('100ms ease-in-out', style({ transform: 'translateX(30%)' }))
    ])
]);
export const SizeChange = trigger('sizeChange', [
    state('in', style({ width: '100%' })),
    transition('* => *', [
        style({ width: '100%' }),
        animate('400ms 100ms ease-in-out')
    ])
]);

export const SlideInOut = trigger('slideInOut', [
    state('in', style({
        transform: 'translate3d(0, 0, 0)'
    })),
    state('out', style({
        transform: 'translate3d(-105%, 0, 0)'
    })),
    transition('in => out', animate('400ms ease-in-out')),
    transition('out => in', animate('400ms ease-in-out'))
]);

