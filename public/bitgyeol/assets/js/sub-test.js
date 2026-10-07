$(document).ready(function () {
    if (window.innerWidth < 768) {
        $('.eb-js-split-line').find('br').remove();
    }
    
    document.querySelectorAll('video[data-src]').forEach(video => {
        const src = video.getAttribute('data-src');
        if (src) {
            video.src = src;
            video.load();
        }
    });

    function initSplitLine() {
        SplitType.revert('.eb-js-split-line');
        splitLine = new SplitType('.eb-js-split-line', { types: 'lines', tagName: 'span' })
    }
    initSplitLine();

    let wW = $(window).width();

    $(window).on('resize', function () {
        let currentW = $(window).width();

        if (wW !== currentW) {
            SplitType.revert('.eb-js-split-line');
            initSplitLine();
        }

        wW = currentW;
    })

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({
        ease: 'none'
    });

    const pathElements = document.querySelectorAll('.eb-sb02-4 .eb-sctx7 .eb-pthx');
    pathElements.forEach((path, idx) => {
        const pathLength = idx !== 0 && path.getTotalLength();

        if (pathLength) {
            gsap.set(path, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength,
            })
        }
    });

    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)'
    }, (context) => {
        const { isDesktop, isMobile } = context.conditions;

        let sub02_4_s1_tl = gsap.timeline({
            paused: true,
            duration: 1,
            ease: 'power2.inOut',
        })

        if (isDesktop) {
            sub02_4_s1_tl.to('.eb-sb02-4 .eb-sctx4 .eb-pic-wr3', {
                x: 0,
                opacity: 1,
            })
                .to('.eb-sb02-4 .eb-sctx4 [data-ani="fade-up"]', {
                    y: 0,
                    opacity: 1,
                    stagger: {
                        each: .05,
                    }
                }, '-=.3')

            let sub02_4_s2_tl = gsap.timeline({
                paused: true,
                duration: 1,
                ease: 'power2.inOut',
            })


            sub02_4_s2_tl.to('.eb-sb02-4 .eb-sctx7 [data-ani="fade-right"]', {
                x: 0,
                opacity: 1,
                stagger: {
                    each: .2,
                    onComplete: () => {
                        pathElements.forEach((path, idx) => {
                            const pathLength = idx !== 0 && path.getTotalLength();

                            if (idx === 0) {
                                gsap.to(path, {
                                    opacity: 1,
                                    duration: 2,
                                    ease: 'none',
                                    delay: idx * 0.5
                                })
                            } else {
                                gsap.to(path, {
                                    opacity: 1,
                                    strokeDashoffset: 0,
                                    duration: () => {
                                        return idx === 1 ? 2 : 1.5
                                    },
                                    ease: 'power2.inOut',
                                })
                            }
                        });
                    }
                },
            })

            
            ScrollTrigger.create({
                trigger: '.eb-sb02-4 .eb-sctx7',
                start: '0% 70%',
                end: '100% 70%',
                animation: sub02_4_s2_tl,
                toggleActions: 'play none none none',
            })

            const sub02_4_s4_tl = gsap.timeline({
                paused: true,
                duration: 1,
            })
                .to('.eb-sb02-4 .eb-sctx10 [data-ani="fade-right"]', {
                    x: 0,
                    opacity: 1,
                    stagger: {
                        each: .1,
                    }
                })

            ScrollTrigger.create({
                trigger: '.eb-sb02-4 .eb-sctx10',
                start: '0% 70%',
                end: '100% 70%',
                once: true,
                animation: sub02_4_s4_tl,
                
            })
        } else {
            sub02_4_s1_tl.to('.eb-sb02-4 .eb-sctx4 [data-ani="fade-up"]', {
                y: 0,
                opacity: 1,
                stagger: {
                    each: .05,
                }
            })
                .to('.eb-sb02-4 .eb-sctx4 .eb-pic-wr3', {
                    x: 0,
                    opacity: 1,
                }, '-=.3')

            gsap.utils.toArray('.eb-sb02-4 .eb-sctx7 [data-ani="fade-right"]').forEach((el, idx) => {
                gsap.set(el, {
                    x: 0
                })
                gsap.fromTo(el, {
                    y: 30,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: '0% 70%',
                        end: '100% 70%',
                        once: true,
                        onEnter: () => {
                            const path = $(el).find('.eb-pthx');

                            if (idx === 0) {
                                gsap.to(path, {
                                    opacity: 1,
                                    duration: 2,
                                    ease: 'none',
                                    delay: idx * 0.5
                                })
                            } else {
                                gsap.to(path, {
                                    opacity: 1,
                                    strokeDashoffset: 0,
                                    duration: () => {
                                        return idx === 1 ? 2 : 1.5
                                    },
                                    ease: 'power2.inOut',
                                })
                            }
                        }
                    }
                })
            })

            gsap.utils.toArray('.eb-sb02-4 .eb-sctx10 [data-ani="fade-right"]').forEach(el => {
                gsap.set(el, {
                    x: 0,
                })
                gsap.fromTo(el, {
                    y: 30,
                    opacity: 0,
                }, {
                    y: 0,
                    opacity: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: '0% 70%',
                        end: '100% 70%',
                        once: true,
                    }
                })
            })
        }

        
        ScrollTrigger.create({
            trigger: '.eb-sb02-4 .eb-sctx4',
            start: '0% 80%',
            end: '100% 80%',
            
            animation: sub02_4_s1_tl,
            toggleActions: 'play none none none',
        })

        const sub02_4_s3_tl = gsap.timeline({
            paused: true,
            duration: .7,
            ease: 'power2.inOut',
        })
            .to('.eb-sb02-4 .eb-sctx8 .eb-js-sub-tit-area [data-ani="fade-up"]', {
                y: 0,
                opacity: 1,
                stagger: {
                    each: .1,
                }
            })
            .to('.eb-sb02-4 .eb-sctx8 .eb-rl-1', {
                scaleY: 1,
                duration: .5,
                ease: 'power3.inOut',
            }, '-=.2')
            .to('.eb-sb02-4 .eb-sctx8 .eb-tt-ar', {
                opacity: 1,
            }, '-=.1')
            .to('.eb-sb02-4 .eb-sctx8 .eb-tt-ar', {
                '--posX': 0,
                duration: .5,
                ease: 'power2',
            }, '-=.2')
            .to('.eb-sb02-4 .eb-sctx8 .eb-tt-ar [data-ani="fade-up"]', {
                y: 0,
                opacity: 1,
                stagger: {
                    each: .1,
                }
            }, '-=.1')

        ScrollTrigger.create({
            trigger: '.eb-sb02-4 .eb-sctx8',
            start: () => {
                return isDesktop ? '0% 80%' : '-25% 100%'
            },
            end: () => {
                return isDesktop ? '100% 80%' : '-25% 100%'
            },
            animation: sub02_4_s3_tl,
            toggleActions: 'play none none none',
        })


        const sub02_4_s8_tl = gsap.timeline({
            paused: true,
            repeat: -1,
            repeatDelay: 17,
        })
            .to('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(1) .line', {
                '--width': '100%',
                duration: 1,
                ease: 'power1.inOut',
                stagger: {
                    each: .5,
                },
                onComplete: () => {
                    setTimeout(() => {
                        gsap.set('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(1) .line', {
                            '--width': 0
                        })
                    }, 33000);
                }
            })
            .to('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(2) .line', {
                '--width': '100%',
                duration: 1,
                ease: 'power1.inOut',
                delay() {
                    return 33
                },
                stagger: {
                    each: .5,
                },
                onComplete: () => {
                    setTimeout(() => {
                        gsap.set('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(2) .line', {
                            '--width': 0
                        })
                    }, 26000);
                }
            })
            .to('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(3) .line', {
                '--width': '100%',
                duration: 1,
                ease: 'power1.inOut',
                delay() {
                    return 26
                },
                stagger: {
                    each: .5,
                },
                onComplete: () => {
                    setTimeout(() => {
                        gsap.set('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(3) .line', {
                            '--width': 0
                        })
                    }, 10000);
                }
            })
            .to('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(4) .line', {
                '--width': '100%',
                duration: 1,
                ease: 'power1.inOut',
                delay() {
                    return 10
                },
                stagger: {
                    each: .5,
                },
                onComplete: () => {
                    setTimeout(() => {
                        gsap.set('.eb-sb02-4 .eb-sctx6 .eb-sc1x-ls li:nth-child(4) .line', {
                            '--width': 0
                        })
                    }, 17000);
                }
            })

        ScrollTrigger.create({
            trigger: '.eb-sb02-4 .eb-sctx6',
            start() {
                return '0% 50%'
            },
            end: () => {
                return '0% 50%'
            },
            
            toggleActions: 'play none none none',
            onEnter: () => {
                const video = document.querySelector('.eb-sb02-4 .eb-sctx6 video');
                if (video) {
                    video.play();
                    video.addEventListener('play', () => sub02_4_s8_tl.play());
                }
            },
        })

    });




});